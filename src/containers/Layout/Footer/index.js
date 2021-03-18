import styles from "./Footer.module.css"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.footer}>
        <div className={styles.quick_links}>
          <Link to={"/"}>Home</Link>
          <Link to={"/report/issue"}>Report Issue</Link>
        </div>
        <div>
          <Link to={"/logout"}>Logout</Link>
        </div>
      </div>
    </footer>
  )
}