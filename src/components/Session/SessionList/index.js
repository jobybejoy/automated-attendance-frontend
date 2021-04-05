import styles from "./SessionList.module.css"
import SessionItem from "./SessionItem"
import Skeleton from 'react-loading-skeleton';

export default function SessionList({ sessions, loading }) {

  if (loading) {
    return (
      <section className={styles.sessions_container}>
        <Skeleton style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "0.6rem" }} height={60} />
        <Skeleton style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "0.6rem" }} height={60} />
        <Skeleton style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "0.6rem" }} height={60} />
      </section>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className={styles.empty_state}>
        You have no sessions so far
      </div>
    )
  }
  return (
    <section className={styles.sessions_container}>
      {
        sessions.map((session, index) => {
          return (<SessionItem session={session} key={session?.course_id + session?.session_id + session.term + index} />)
        })
      }
    </section>
  )
}

