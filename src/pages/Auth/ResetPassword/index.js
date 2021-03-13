import { useState } from 'react';
import styles from '../Login/Login.module.css';

import { Link } from "react-router-dom"

import Label from "../../../components/Form/Label"
import Input from "../../../components/Form/Input"
import { InputGroup } from "../../../components/Form/Containers"

import ButtonGroup from "../../../components/Button/ButtonGroup"

import { CTA_Button, OutlineButton } from "../../../components/Button"
import { API_BASE } from "../../../api/base"

import useToken from "../../../containers/App/useToken"
import { useHistory } from "react-router-dom";

async function ResetPasswordUser(credentials) {
  return fetch(`${API_BASE}/reset/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}


export default function SignUp() {

  const history = useHistory();

  // Redirect to Home if Authenticated
  const { token } = useToken();
  if (token) {
    history.push("/")
  }

  const [email, setEmail] = useState("Someemail@gmail.com");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    // if (password !== passwordConfirm) {
    //   throw new Error({ "password_confirm": "Please verify the password" })
    // }

    const response = await ResetPasswordUser({
      // email,
      password,
      password_confirm: passwordConfirm
    });
  }

  return (
    <main className={styles.auth_container}>
      <div className={styles.box_container}>
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email" className={styles.input_label}>Email</Label>
            <Input type="email" name="email"
              placeholder="jane@email.com"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
              disabled
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password" >Password</Label>
            <Input type="password" name="password"
              placeholder="pas*****"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password_confirm" >Confirm Password</Label>
            <Input type="password" name="password_confirm"
              placeholder="pas*****"
              onChange={e => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              required
            />
          </InputGroup>

          <ButtonGroup>
            <CTA_Button type="submit" value="Sign Up" />
            <Link to="/auth/login">
              <OutlineButton value="Already have an Account?" />
            </Link>
          </ButtonGroup>
        </form>

      </div>
    </main>
  )
}