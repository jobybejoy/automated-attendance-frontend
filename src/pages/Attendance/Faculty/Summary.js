import styles from "../Student/StudentAttendance.module.css"
import { CallToActionButton } from "../../../components/Button"
import Skeleton from "react-loading-skeleton"

const NumberInMinTwoDigits = (number) => {
  if (!number) return <Skeleton style={{ height: "4rem", width: 103 }} />
  return (number < 10) ? '0' + number.toString() : number.toString();
}

function Sessions({ session_attendance, start_session_handler }) {
  return (
    <div className={styles.summary_container}>
      <div className={styles.summary_section_title}>Summary</div>
      <div className={styles.summary_card}>
        <h2 className={styles.summary_title_very_large}>{NumberInMinTwoDigits(session_attendance?.percentage) || <Skeleton style={{ height: "5rem", width: 286 }} />}</h2>
        <div className={styles.summary_subheading}>Avg. Attendance</div>
      </div>
      <CallToActionButton className={styles.cta_start_session} value="Start Session" onClick={start_session_handler} />
      {/* <div className={styles.summary_card}>
        <h2 className={styles.summary_title_large}>{NumberInMinTwoDigits(session_attendance?.attended) || "-- "} / {NumberInMinTwoDigits(session_attendance?.all_sessions) || "--"}</h2>
        <div className={styles.summary_subheading}>
          <span>Attended</span>
          <span style={{ marginLeft: session_attendance?.all_sessions ? "4rem" : "2rem" }}>All Sessions</span></div>
      </div> */}
    </div>
  );
}

export default Sessions;
