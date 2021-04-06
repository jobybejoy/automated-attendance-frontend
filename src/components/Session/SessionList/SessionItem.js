import styles from "./SessionList.module.css"
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';

export default function SessionItem({ session }) {

  if (!session) {
    return <Skeleton
      style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "0.6rem" }} height={60} />
  }

  const getSessionURL = (session) => {
    if (!session) return
    const [department, course_id] = session.course_string.split(" ")
    return `/${department}/${course_id}/session/${session.session_name}`
  }

  const url = getSessionURL(session)

  return (
    <Link to={url}>
      <div className={styles.session_card}>
        <div>
          <div className={styles.course_id}>{session?.course_string.toUpperCase()}</div>
          <div className={styles.session_id}>{session?.session_name}</div>
        </div>
        <div className={styles.course_name}>{session?.course_name}</div>
        <div className={styles.term}>{session?.term + " " + session?.year}</div>
      </div>
    </Link>
  )
}