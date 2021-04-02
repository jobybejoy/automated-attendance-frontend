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

// import { UserContext } from "../../../context/UserContext"


import UpdateUserProfile from "../../../api/user/updateProfile"
import useToken from "../../../api/auth/useToken"
import useUser from "../../../api/user/index"

export default function EditProfileWrapper() {
  const { user, isError, isLoading } = useUser()
  // const { user, isLoading, isError } = useContext(UserContext)

  if (isLoading) {
    return "Loading ..."
  }

  if (isError) {
    return (
      <Layout>
        <div className={styles.profile_container}>
          <h2 className={styles.profile_name}>
            User Not Found
        </h2>
        </div>
      </Layout>
    )
  }

  return <EditProfile user={user} />
}

function EditProfile({ user }) {

  const { token } = useToken();

  const history = useHistory();
  const [firstName, setFirstName] = useState(user?.first_name)
  const [lastName, setLastName] = useState(user?.last_name)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_no);
  const [address, setAddress] = useState(user?.address);

  const handleSubmit = async e => {
    e.preventDefault();

    console.log({
      firstName, lastName, phoneNumber, address
    });

    UpdateUserProfile(
      { first_name: firstName, last_name: lastName, phone_no: phoneNumber, address },
      token
    )
      .then(() => {
        history.push("/profile");
      })


    // !In case err have to handle it.

  }

  return (
    <Layout>
      <div className={styles.profile_container}>
        <Button onClick={() => { history.goBack() }} style={{ paddingRight: "1rem", marginBottom: "1rem" }}>
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
            <Label htmlFor="name">First Name</Label>
            <Input type="text" name="name"
              placeholder="John"
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="name">Last Name</Label>
            <Input type="text" name="name"
              placeholder="Doe"
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="phone_number" >Phone Number</Label>
            <Input type="text" name="phone_number"
              placeholder="+1(551)222-0011"
              onChange={e => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              required
            />
            <Helper className={styles.helper}>Enter phone number here</Helper>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="address" >Address</Label>
            {/* <pre contenteditable="true">
              {user.address}
            </pre> */}

            <TextArea
              value={address || "10011 Location, Flr/Apt Num, State, Country, ZIP"}
              name="address" id="" cols="100" rows="5"
              onChange={e => setAddress(e.target.value)}
            />

          </InputGroup>

          <ButtonGroup>
            <CallToActionButton type="submit" value="Update" />
          </ButtonGroup>

        </form>
      </div>
    </Layout >
  )
}
