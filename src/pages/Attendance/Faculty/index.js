import Layout from "../../../containers/Layout"
import styles from "../Student/StudentAttendance.module.css"

import { useContext } from "react"
import { useParams } from 'react-router-dom';

import Calender from "../../../components/Calender"
import Summary from "./Summary"
import { PercentageCalenderItem } from "../../../components/Calender/DateElement"

import { SessionsContext } from "../../../context/SessionsContext"

import useSessionAttendance from "../../../api/attendance/faculty"

import { findSession } from "../../../helpers/findSession.js"

import StartSession from "../../../api/attendance/Faculty/StartSession"

import useToken from "../../../api/auth/useToken"
import { useHistory, useLocation } from "react-router-dom"


export default function FacultyAttendanceWrapper() {

  const { department, course_number, session_id } = useParams();
  const { sessions } = useContext(SessionsContext)


  const today = new Date()

  const { token } = useToken()
  const history = useHistory();
  const { pathname } = useLocation()

  const session = findSession({ sessions, department, course_number, session_id });

  // console.log({ session });

  const { session_attendance, isError, isLoading } = useSessionAttendance(session?.course_id, session?.session_id);

  if (isLoading) {
    return (
      <Layout >
        <div className={styles.attendance_container}>
          <Calender className={styles.attendance_calender} data={[]} DateComponent={PercentageCalenderItem} />
          {/* <Summary /> */}
        </div>
      </Layout>
    )
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

  const getDate = (today) => {
    return {
      date: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    }
  }

  const getStartSessionURL = (pathname, today) => {
    const { date, month, year } = getDate(today)
    return (`${pathname}/attendance/on/${year}/${month}/${date}`)
  }

  function start_session_handler(token, course_id, session_id, today) {
    StartSession(token, course_id, session_id, today)
      .then(() => {
        const url = getStartSessionURL(pathname, today)
        history.push(url)
      })
      .catch(error => console.error(error))
  }


  return <FacultyAttendance session_attendance={data} start_session_handler={() => start_session_handler(token, session?.course_id, session?.session_id, today)} />;

}

function FacultyAttendance({ session_attendance, start_session_handler }) {

  return (
    <Layout>
      <div className={styles.attendance_container}>
        <Calender className={styles.attendance_calender} data={session_attendance?.attendance_data || []} DateComponent={PercentageCalenderItem} />
        <Summary session_attendance={session_attendance} start_session_handler={() => start_session_handler()} />
      </div>
    </Layout>
  )
}
