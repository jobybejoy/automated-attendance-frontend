import styles from "../Student/StudentAttendance.module.css"

const NumberInMinTwoDigits = (number) => {
  if (!number) return "--"
  return (number < 10) ? '0' + number.toString() : number.toString();
}

function Sessions({ session_attendance }) {
  return (
    <div className={styles.summary_container}>
      <div className={styles.summary_section_title}>Summary</div>
      <div className={styles.summary_card}>
        <h2 className={styles.summary_title_very_large}>{session_attendance?.percentage || "--%"}</h2>
        <div className={styles.summary_subheading}>Attendance</div>
      </div>
      <div className={styles.summary_card}>
        <h2 className={styles.summary_title_large}>{NumberInMinTwoDigits(session_attendance?.attended) || "-- "} / {NumberInMinTwoDigits(session_attendance?.all_sessions) || "--"}</h2>
        <div className={styles.summary_subheading}>
          <span>Attended</span>
          <span style={{ marginLeft: session_attendance?.all_sessions ? "4rem" : "2rem" }}>All Sessions</span></div>
      </div>
    </div>
  );
}

export default Sessions;
