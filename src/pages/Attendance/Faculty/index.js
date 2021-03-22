import Layout from "../../../containers/Layout"
import styles from "../Student/StudentAttendance.module.css"

import { useContext } from "react"
import { useParams } from 'react-router-dom';

import Calender from "../../../components/Calender"
import Summary from "./Summary"
import { PercentageCalenderItem } from "../../../components/Calender/DateElement"

import { SessionsContext } from "../../../context/SessionsContext"

import useSessionAttendance from "../../../api/attendance/faculty"

import { findSession } from "../helpers.js"


export default function FacultyAttendanceWrapper() {

  const { department, course_number, session_id } = useParams();
  const { sessions } = useContext(SessionsContext)

  const session = findSession(sessions, department, course_number, session_id);

  console.log({ session });

  const { session_attendance, isError, isLoading } = useSessionAttendance(session?.course_id, session?.session_id);

  if (isLoading) {
    return "Fetching Attendance Details"
  }

  const getAveragePercentage = (data) => {
    const sum = data.reduce((acc, el) => acc + Number(el.percentage), 0)
    const avg = Math.round(sum / data.length)
    return `${avg}%`
  }

  console.log(session_attendance);
  const data = {
    "attendance_data": session_attendance,
    "percentage": getAveragePercentage(session_attendance)
  }

  return <FacultyAttendance session_attendance={data} />;

}

function FacultyAttendance({ session_attendance }) {

  return (
    <Layout>
      <div className={styles.attendance_container}>
        <Calender className={styles.attendance_calender} data={session_attendance?.attendance_data || []} DateComponent={PercentageCalenderItem} />
        <Summary session_attendance={session_attendance} />
      </div>
    </Layout>
  )
}
