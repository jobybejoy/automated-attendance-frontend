import styles from "./SessionList.module.css"
import SessionItem from "./SessionItem"

export default function SessionList({ sessions }) {

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

