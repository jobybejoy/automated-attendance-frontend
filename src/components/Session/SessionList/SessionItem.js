import styles from "./SessionList.module.css"
import { Link } from 'react-router-dom'

export default function SessionItem({ session, key }) {
  return (
    <Link to={session.url} key={key}>
      <div className={styles.session_card}>
        <div>
          <div className={styles.course_id}>{session.course_id}</div>
          <div className={styles.session_id}>{session.session_id}</div>
        </div>
        <div className={styles.course_name}>{session.course_name}</div>
        <div className={styles.term}>{session.term}</div>
      </div>
    </Link>
  )
}