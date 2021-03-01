import styles from "./Profile.module.css"
import { LayoutOnly as Layout } from "../../containers/Layout"

import face_emoji from "../../assets/images/icons/face.svg"

export default function Profile() {

  const user = {
    name: "John doe",
    email: "email@njit.edu",
    department: "Computer Science",
    phone_number: "+1 551 263 9920",
    address: "Some place, Sowhere\nState country\nzip"
  }

  return (
    <Layout>
      <div className={styles.profile_container}>
        <div className={styles.profile_image_container}>
          <img src={face_emoji} alt="" />
        </div>
        <h2 className={styles.profile_name}>
          {user.name}
        </h2>
        <h3 className={styles.profile_email}>
          <a href={"mailto:" + user.email} target="_blank" rel="noopener noreferrer">{user.email}</a>
        </h3>
        <h3 className={styles.profile_department}>
          {user.department}
        </h3>
        <h3 className={styles.profile_phone}>
          <a href={"tel:" + user.phone_number} target="_blank" rel="noopener noreferrer">{user.phone_number}</a>
        </h3>
        <h3 className={styles.profile_address}>
          <pre>
            {user.address}
          </pre>
        </h3>
      </div>

    </Layout>
  )
}
