import { useState } from 'react';
import styles from '../Login/Login.module.css';

import { Link } from "react-router-dom"

import Label from "../../../components/Form/Label"
import Input from "../../../components/Form/Input"

import { CTA_Button, Outline_Button } from "../../../components/Button"


async function forgotPasswordUser(credentials) {
  return fetch('http://localhost:8080/forgot/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}


export default function ForgotPassword() {
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
          <div className={styles.input_group}>
            <Label htmlFor="email" className={styles.input_label}>Email</Label>
            <Input type="email" name="email"
              placeholder="jane@email.com"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className={styles.button_group}>
            <CTA_Button type="submit" value="Reset" />
            <Link to="/auth/login">
              <Outline_Button value="Go to Login" />
            </Link>
          </div>
        </form>

      </div>
    </main>
  )
}