import Layout from "../../../containers/Layout"
import styles from "./StudentAttendance.module.css"

import Calender from "../../../components/Calender"
import Summary from "./Summary"
import { CalenderItem, PercentageCalenderItem } from "../../../components/Calender/DateElement"

import useAttendance from "../../../api/attendance"

export default function StudentAttendanceWrapper() {

  const { session_attendance, isError, isLoading } = useAttendance()

  if (isLoading) {
    return "Fetching Attendance Details"
  }


  return <StudentAttendance session_attendance={session_attendance} />;

}

function StudentAttendance({ session_attendance }) {

  return (
    <Layout>
      <div className={styles.attendance_container}>
        <Calender className={styles.attendance_calender} data={session_attendance?.attendance_data} DateComponent={CalenderItem} />
        <Summary session_attendance={session_attendance} />
      </div>
    </Layout>
  )
}
