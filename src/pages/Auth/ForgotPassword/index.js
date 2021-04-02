import { useState } from 'react';
import styles from '../Login/Login.module.css';

import { Link } from "react-router-dom"

import Label from "../../../components/Form/Label"
import Input from "../../../components/Form/Input"
import { InputGroup } from "../../../components/Form/Containers"

import ButtonGroup from "../../../components/Button/ButtonGroup"
import { CallToActionButton, OutlineButton } from "../../../components/Button"

import useToken from "../../../api/auth/useToken"
import { useHistory } from "react-router-dom";

import { API_BASE } from "../../../api/base"

async function forgotPasswordUser(credentials) {
  return fetch(`${API_BASE}/forgot/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}


export default function ForgotPassword() {
  const history = useHistory();

  // Redirect to Home if Authenticated
  const { token } = useToken();
  if (token) {
    history.push("/")
  }
  const [email, setEmail] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await forgotPasswordUser({
      email,
    });
  }

  return (
    <main className={styles.auth_container}>
      <div className={styles.box_container}>
        <h2>Forgot Password? </h2>
        <p>A magic link would be sent to your email address</p>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email" className={styles.input_label}>Email</Label>
            <Input type="email" name="email"
              placeholder="jane@email.com"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          </InputGroup>

          <ButtonGroup>
            <CallToActionButton type="submit" value="Reset" />
            <Link to="/auth/login">
              <OutlineButton value="Go to Login" />
            </Link>
          </ButtonGroup>
        </form>

      </div>
    </main>
  )
}