import Layout from "../../../containers/Layout"
import styles from "./StudentAttendance.module.css"

import { useContext } from "react"
import { useParams } from 'react-router-dom';

import Calender from "../../../components/Calender"
import Summary from "./Summary"
import { CalenderItem } from "../../../components/Calender/DateElement"

import { SessionsContext } from "../../../context/SessionsContext"

import useStudentAttendance from "../../../api/attendance/student.js"

import { findSession } from "../helpers.js"

export default function StudentAttendanceWrapper() {

  const { department, course_number, session_id } = useParams();
  const { sessions } = useContext(SessionsContext)

  const session = findSession(sessions, department, course_number, session_id);

  const { session_attendance, isError, isLoading } = useStudentAttendance(session?.course_id, session?.session_id);

  if (isLoading) {
    return "Fetching Attendance Details"
  }

  return <StudentAttendance session_attendance={session_attendance} />;

}

function StudentAttendance({ session_attendance }) {

  console.log({ session_attendance })

  return (
    <Layout>
      <div className={styles.attendance_container}>
        <Calender className={styles.attendance_calender} data={session_attendance?.attendance_data || []} DateComponent={CalenderItem} />
        <Summary session_attendance={session_attendance} />
      </div>
    </Layout>
  )
}
