import styles from "./Navbar.module.css"
import face_emoji from "../../../assets/images/icons/face.svg"
import { Link } from "react-router-dom"

import SessionHeader from "../../../components/Session/Header/index.js"
export default function Navbar(params) {

  const user = {
    // image: "https://avatars.githubusercontent.com/u/57924079?s=400&u=2466c49e5a5ad2a805da76695cfe9d74d533d339&v=4"
  }

  const session = { course_id: "CS 123", session_id: "111", course_name: "Data Structures and Algorithms", term: "Fall 2020", url: "/cs/123/session/111" }
  return (
    <nav className={styles.nav_container}>
      {/* <h1 className={styles.large_title}>Hello, John Doe</h1> */}
      <SessionHeader session={session} />
      <Link to="/profile">
        <div className={styles.user_profile_container}>
          <img src={user?.image || face_emoji} alt="User Profile Image" />
        </div>
      </Link>

    </nav>
  )
};
