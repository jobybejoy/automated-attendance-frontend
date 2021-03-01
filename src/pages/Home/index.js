import Layout from "../../containers/Layout"
import styles from "./Home.module.css"

export default function Home() {

  const sessions = [
    { course_id: "CS 123", session_id: "111", course_name: "Data Structures and Algorithms", term: "fall 2020" },
    { course_id: "CS 656", session_id: "001", course_name: "Machine Learning", term: "fall 2020" },
    { course_id: "CS 123", session_id: "101", course_name: "Data Structures and Algorithms", term: "fall 2020" }
  ]

  return (
    <Layout>
      <h5>Sessions</h5>
      {
        sessions.map((session, index) => {
          return (
            <div key={index} className={styles.session_card}>
              <div>
                <div className={styles.course_id}>{session.course_id}</div>
                <div className={styles.session_id}>{session.session_id}</div>
                <div className={styles.course_name}>{session.course_name}</div>
              </div>
              <div className={styles.term}>{session.term}</div>
            </div>
          )
        })
      }
    </Layout>
  );
}