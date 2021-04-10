import { useHistory } from "react-router-dom";
import { useContext } from 'react';

import styles from "./Profile.module.css"
import { LayoutOnly as Layout } from "../../containers/Layout"

import { Button } from '../../components/Button'
import { Link } from "react-router-dom"

import face_emoji from "../../assets/images/icons/face.svg"
import back_icon from "../../assets/images/icons/navigate_before.svg"

import useUser from "../../api/user/index"

import ErrorPage from "../../pages/_Error"

export default function ProfileWrapper() {

  const { user, isError, isLoading } = useUser()

  if (isLoading) {
    return "Loading ..."
  }

  if (isError) {
    return (<ErrorPage error={isError} />)
  }

  return <Profile user={user} />
}

export function Profile({ user }) {

  const history = useHistory();

  // const { user, isError, isLoading } = useUser()

  return (
    <Layout>
      <div className={styles.profile_container}>
        <Button onClick={() => { history.push("/") }} style={{ paddingRight: "1rem", marginBottom: "2rem" }}>
          <img src={back_icon} alt="Back" /> Go Back
        </Button>
        <Link to="/profile/edit"><Button className={styles.profile_edit_btn} value="edit" /></Link>
        <div className={styles.profile_image_container}>
          <img src={face_emoji} alt="" />
        </div>
        <h2 className={styles.profile_name}>
          {user.first_name + " " + user.last_name}
        </h2>
        <h3 className={styles.profile_email}>
          <a href={"mailto:" + user.email} target="_blank" rel="noopener noreferrer">{user.email}</a>
        </h3>
        <h3 className={styles.profile_department}>
          {user.dept_name}
        </h3>
        <h3 className={styles.profile_phone}>
          <a href={"tel:" + user.phone_no} target="_blank" rel="noopener noreferrer">{user.phone_no}</a>
        </h3>
        <h3 className={styles.profile_address}>
          <pre>
            {user.address}
          </pre>
        </h3>
      </div>

    </Layout >
  )
}
