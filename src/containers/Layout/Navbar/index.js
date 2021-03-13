import styles from "./Navbar.module.css"
import face_emoji from "../../../assets/images/icons/face.svg"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';

import SessionHeader from "../../../components/Session/Header/index.js"

import { useContext } from "react";
import { UserContext } from "../../../context/UserContext"
import { SessionsContext } from "../../../context/SessionsContext"

const Header = ({ department, course_number, session_id, session, user }) => {

  if (department && course_number && session_id) {
    return <SessionHeader session={session} />
  } else {
    return <h1 className={styles.large_title}>Hello, {user?.name}</h1>
  }

}

const getSession = ({ sessions, course_number, session_id }) => {
  // ! currently finding session only with sessionID
  // * Verfy the structure of session object
  return sessions.find(x => (x.session_id === session_id));
  // && (x.course_id === course_number)
  // }
}

function Navbar() {

  const { user } = useContext(UserContext)
  const { sessions, isError, isLoading } = useContext(SessionsContext)
  // Gets the department,course_id and  params from url
  const { department, course_number, session_id } = useParams();
  // const sessions = [
  //   { course_id: "CS 123", session_id: "111", course_name: "Data Structures and Algorithms", term: "Fall 2020", url: "/cs/123/session/111" },
  // { course_id: "CS 656", session_id: "001", course_name: "Machine Learning", term: "Fall 2020", url: "/cs/656/session/001" },
  // { course_id: "CS 123", session_id: "101", course_name: "Data Structures and Algorithms", term: "Fall 2020", url: "/cs/123/session/101" }
  // ]

  if (isLoading) {
    return "Loading"
  }


  const session = getSession({ sessions, course_number, session_id })

  return (
    <nav className={styles.nav_container}>
      {/* <h1 className={styles.large_title}>Hello, John Doe</h1> */}
      <Header department={department} course_number={course_number} session_id={session_id} user={user} session={session} />

      <Link to="/profile">
        <div className={styles.user_profile_container}>
          <img src={user?.image || face_emoji} alt="An awsome portait of the user" />
        </div>
      </Link>

    </nav>
  )
};

export default Navbar;