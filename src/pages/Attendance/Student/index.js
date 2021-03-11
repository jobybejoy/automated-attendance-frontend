import Layout from "../../../containers/Layout"
import styles from "./StudentAttendance.module.css"

import Calender from "../../../components/Calender"
import { CalenderItem, PercentageCalenderItem } from "../../../components/Calender/DateElement"

export default function StudentAttendance({ params }) {

  const student_attendance = {
    attendance_data: [
      { date: "2/21/2021", type: "attended" },
      { date: "2/22/2021", type: "attended" },
      { date: "3/1/2021", type: "attended" },
      { date: "3/2/2021", type: "attended" },
      { date: "3/7/2021", type: "attended" },
      { date: "3/9/2021", type: "absent" }
    ],
    attended: 24,
    all_sessions: 28,
    percentage: "79%",
  }


  return (
    <Layout>
      <div className={styles.attendance_container}>
        <Calender className={styles.attendance_calender} data={student_attendance.attendance_data} DateComponent={CalenderItem} />
        <div className={styles.summary_container}>
          <div className={styles.summary_section_title}>Summary</div>
          <div className={styles.summary_card}>
            <h2 className={styles.summary_title_very_large}>{student_attendance?.percentage || "--%"}</h2>
            <div className={styles.summary_subheading}>Attendance</div>
          </div>
          <div className={styles.summary_card}>
            <h2 className={styles.summary_title_large}>{student_attendance.attended || "-- "} / {student_attendance.all_sessions || "--"}</h2>
            <div className={styles.summary_subheading}>
              <span>Attended</span>
              <span style={{ marginLeft: student_attendance.all_sessions ? "4rem" : "2rem" }}>All Sessions</span></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
