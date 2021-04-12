import styles from "./Navbar.module.css"
import face_emoji from "../../../assets/images/icons/face.svg"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';

import SessionHeader from "../../../components/Session/Header/index.js"

import { useContext } from "react";
import { UserContext } from "../../../context/UserContext"
import { SessionsContext } from "../../../context/SessionsContext"

import Skeleton from 'react-loading-skeleton';
import ErrorPage from "../../../pages/_Error"

import { findSession } from "../../../helpers/findSession"

export const Header = ({ department, course_number, session_id, sessions, user }) => {

  if (department && course_number && session_id) {
    const session = findSession({ sessions, department, course_number, session_id })
    return <SessionHeader session={session} />
  } else {
    return <h1 className={styles.large_title}>Hello, {user ? (user?.first_name + " " + user?.last_name) : <Skeleton width={300} height={45} />}</h1>
  }

}



function NavbarContainer() {
  const { user, isError: isUserError } = useContext(UserContext)
  const { sessions, isError: isSessionsError } = useContext(SessionsContext)

  const { department, course_number, session_id } = useParams();

  // if (isLoading) {
  //   return "Loading"
  // }

  if (isUserError) {
    return <ErrorPage error={isUserError} />
  }

  if (isSessionsError) {
    return <ErrorPage error={isSessionsError} />
  }


  return <Navbar user={user} sessions={sessions} department={department} course_number={course_number} session_id={session_id} />

}

export function Navbar({ user, sessions, department, course_number, session_id }) {

  return (
    <nav className={styles.nav_container}>
      {/* <h1 className={styles.large_title}>Hello, John Doe</h1> */}
      <Header department={department} course_number={course_number} session_id={session_id} user={user} sessions={sessions} />

      <Link to="/profile">
        <div className={styles.user_profile_container}>
          <img src={user?.image || face_emoji}
            alt="An awsome portait of the user"
            aria-label="Profile Image"
          />
        </div>
      </Link>

    </nav>
  )
};

export default NavbarContainer;