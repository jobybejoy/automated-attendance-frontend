import styles from "./Profile.module.css"
import { LayoutOnly as Layout } from "../../containers/Layout"

import { Button } from '../../components/Button'
import back_icon from "../../assets/images/icons/navigate_before.svg"

import Skeleton from 'react-loading-skeleton';


export default function ProfileLoading(params) {
  return (
    <Layout>
      <div className={styles.profile_container}>
        <Button disabled={true} style={{ paddingRight: "1rem", marginBottom: "2rem" }}>
          <img src={back_icon} alt="Back" /> Go Back
          </Button>
        <Button className={styles.profile_edit_btn} disabled={true} value="edit" />
        <div className={styles.profile_image_container}>
          <Skeleton style={{ width: "9rem", height: "9rem", borderRadius: "10000px" }} />
        </div>
        <h2 className={styles.profile_name}>
          <Skeleton style={{ width: "80%", borderRadius: "0.5rem" }} height={60} />
        </h2>
        <h3 className={styles.profile_email}>
          <Skeleton style={{ width: "40%", borderRadius: "0.5rem" }} height={33} />
        </h3>
        <h3 className={styles.profile_department}>
          <Skeleton style={{ width: "60%", borderRadius: "0.5rem" }} height={33} />
        </h3>
        <h3 className={styles.profile_phone}>
          <Skeleton style={{ width: "50%", borderRadius: "0.5rem" }} height={33} />
        </h3>
        <h3 className={styles.profile_address} style={{ "display": "flex", "flexDirection": "column" }}>
          <Skeleton style={{ width: "70%", borderRadius: "0.5rem", marginBottom: "0.4rem" }} height={33} />
          <Skeleton style={{ width: "50%", borderRadius: "0.5rem", marginBottom: "0.6rem" }} height={33} />
        </h3>
      </div>
    </Layout >
  )
};
