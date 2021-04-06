import styles from "./SessionList.module.css"
import SessionItem from "./SessionItem"
import Skeleton from 'react-loading-skeleton';

export default function SessionList({ sessions, loading }) {

  if (loading || !sessions) {
    return (
      <section className={styles.sessions_container}>
        <SessionItem />
        <SessionItem />
        <SessionItem />
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
          return (<SessionItem session={session} key={index} />)
        })
      }
    </section>
  )
}

