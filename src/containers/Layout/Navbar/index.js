import styles from "./Navbar.module.css"
import face_emoji from "../../../assets/images/icons/face.svg"
import { Link } from "react-router-dom"

export default function Navbar(params) {

  const user = {
    image: "https://avatars.githubusercontent.com/u/57924079?s=400&u=2466c49e5a5ad2a805da76695cfe9d74d533d339&v=4"
  }

  return (
    <nav className={styles.nav_container}>
      <h1 className={styles.large_title}>Hello, John Doe</h1>
      <Link to="/profile">
        <div className={styles.user_profile_container}>
          <img src={user?.image || face_emoji} alt="User Profile Image" />
        </div>
      </Link>

    </nav>
  )
};
