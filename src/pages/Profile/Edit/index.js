import { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";

import styles from "../Profile.module.css"
import { LayoutOnly as Layout } from "../../../containers/Layout"

import face_emoji from "../../../assets/images/icons/face.svg"
import back_icon from "../../../assets/images/icons/navigate_before.svg"

import Input from "../../../components/Form/Input"
import Label, { Helper } from "../../../components/Form/Label"
import { InputGroup } from "../../../components/Form/Containers"

import ButtonGroup from "../../../components/Button/ButtonGroup"
import { Button, CallToActionButton } from '../../../components/Button/index'

import { TextArea } from "../../../components/Form/Input"
import { toast } from 'react-toastify';

// import { UserContext } from "../../../context/UserContext"



import UpdateUserProfile from "../../../api/user/updateProfile"
import useToken from "../../../api/auth/useToken"
import useUser from "../../../api/user/index"

import ProfileLoading from "../ProfileLoading"
import ErrorPage from "../../_Error"

export default function EditProfileWrapper() {
  const { user, isError, isLoading } = useUser()
  // const { user, isLoading, isError } = useContext(UserContext)

  if (isLoading) {
    return <ProfileLoading />
  }

  if (isError) {
    return <ErrorPage error={isError} />
  }

  return <EditProfile user={user} />
}

function EditProfile({ user }) {

  const { token } = useToken();

  const initialErrorState = {
    first_name: undefined,
    last_name: undefined,
    phone_no: undefined,
    address: undefined
  }

  const history = useHistory();
  const [error, setError] = useState(initialErrorState)
  const [firstName, setFirstName] = useState(user?.first_name)
  const [lastName, setLastName] = useState(user?.last_name)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_no);
  const [address, setAddress] = useState(user?.address);

  const handleSubmit = async e => {
    e.preventDefault();

    // console.log({
    //   firstName, lastName, phoneNumber, address
    // });

    return UpdateUserProfile({ first_name: firstName, last_name: lastName, phone_no: phoneNumber, address }, token)
      .then((res) => {
        // console.log({ res })
        toast.success("😎 Profile Looks Good!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          history.push("/profile");
        }, 3000);

      }).catch((error) => {
        // console.log("Error @ update profile")
        // console.log({ error });
        setError(error)
        toast.error("🙈 Opps! Something is not right", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })

  }

  return (
    <Layout>
      <div className={styles.profile_container}>
        <Button onClick={() => { history.push("/profile") }} style={{ paddingRight: "1rem", marginBottom: "1rem" }}>
          <img src={back_icon} alt="Back" /> Go Back
        </Button>
        <div className={styles.profile_image_container}>
          <img src={face_emoji} alt="" />
        </div>
        <h3 className={styles.profile_email} style={{ marginTop: "1.5rem" }}>
          <a href={"mailto:" + user.email} target="_blank" rel="noopener noreferrer">{user.email}</a>
        </h3>
        <h3 className={styles.profile_department}>
          {user.dept_name}
        </h3>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="first_name" className={error.first_name && "error"}>First Name</Label>
            <Input type="text"
              id="first_name"
              name="first_name"
              placeholder="John"
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              className={error.first_name && "error"}
              required
            />
            {
              error.first_name &&
              <Helper className={"error"}>{error.first_name.message}</Helper>
            }

          </InputGroup>
          <InputGroup>
            <Label htmlFor="last_name" className={error.last_name && "error"}>Last Name</Label>
            <Input type="text" name="last_name"
              id="last_name"
              placeholder="Doe"
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              className={error.last_name && "error"}
              required
            />
            {
              error.last_name &&
              <Helper className={"error"}>{error.last_name.message}</Helper>
            }
          </InputGroup>
          <InputGroup>
            <Label htmlFor="phone_number" className={error.phone_no && "error"}>Phone Number</Label>
            <Input type="text" name="phone_number"
              id="phone_number"
              placeholder="+1(551)222-0011"
              onChange={e => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              className={error.phone_no && "error"}
              required
            />
            {
              error.phone_no ?
                <Helper className={"error"}>{error.phone_no.message}</Helper>
                :
                <Helper className={styles.helper}>Enter phone number here</Helper>
            }

          </InputGroup>
          <InputGroup>
            <Label htmlFor="address" className={error.address && "error"}>Address</Label>

            <TextArea
              id="address"
              value={address}
              name="address" cols="100" rows="5"
              onChange={e => setAddress(e.target.value)}
              className={error.address && "error"}
            />

            {
              error.address &&
              <Helper className={"error"}>{error.address.message}</Helper>
            }

          </InputGroup>

          <ButtonGroup>
            <CallToActionButton type="submit" value="Update" />
          </ButtonGroup>

        </form>
      </div>
    </Layout >
  )
}
