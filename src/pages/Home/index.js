import Layout from "../../containers/Layout"
import SessionsList from "../../components/Session/SessionList/index"

export default function Home() {

  const sessions = [
    { course_id: "CS 123", session_id: "111", course_name: "Data Structures and Algorithms", term: "Fall 2020", url: "/cs/123/session/111" },
    { course_id: "CS 656", session_id: "001", course_name: "Machine Learning", term: "Fall 2020", url: "/cs/123/session/111" },
    { course_id: "CS 123", session_id: "101", course_name: "Data Structures and Algorithms", term: "Fall 2020", url: "/cs/123/session/111" }
  ]

  return (
    <Layout>
      <h5>Sessions</h5>

      <SessionsList sessions={sessions} />

    </Layout >
  );
}