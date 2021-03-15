import Layout from "../../../containers/Layout"
import styles from "../Student/StudentAttendance.module.css"

import { useContext } from "react"
import { useParams } from 'react-router-dom';

import Calender from "../../../components/Calender"
import Summary from "./Summary"
import { PercentageCalenderItem } from "../../../components/Calender/DateElement"

import { SessionsContext } from "../../../context/SessionsContext"

import useAttendance from "../../../api/attendance"

const findSession = (sessions, department, course_number, session_id) => {
  if (sessions) {
    return sessions.find(x => (x.session_name === session_id))
  }
}

export default function FacultyAttendanceWrapper() {

  const { department, course_number, session_id } = useParams();
  const { sessions } = useContext(SessionsContext)

  const session = findSession(sessions, department, course_number, session_id);

  const { session_attendance, isError, isLoading } = useAttendance(session?.course_id, session?.session_id);

  if (isLoading) {
    return "Fetching Attendance Details"
  }

  return <FacultyAttendance session_attendance={session_attendance} />;

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
