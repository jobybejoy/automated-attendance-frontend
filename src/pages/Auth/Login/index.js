import { useState } from 'react';
import styles from './Login.module.css';

import { Link } from "react-router-dom"

import Label from "../../../components/Form/Label"
import Input from "../../../components/Form/Input"

import { CTA_Button, Outline_Button } from "../../../components/Button"
import useToken from "../../../containers/App/useToken"
import { useHistory } from "react-router-dom";

import { Redirect } from 'react-router-dom';




async function loginUser(credentials) {
  return await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => { return { token: "TEST_TOKEN" } }).catch(err => { return { token: "TEST_TOKEN" } })
  // .then(data => data.json())
}


export default function Login() {

  const { token, setToken } = useToken();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    console.log(typeof (setToken));
    setToken(token);

    history.push("/");
  }

  return (
    <main className={styles.auth_container}>
      <div className={styles.box_container}>
        <h2>Please Log In</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email"
              placeholder="jane@email.com"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
            <Label className="secondary">Enter email address here</Label>
          </div>
          <div className={styles.input_group}>
            <Label htmlFor="password" >Password</Label>
            <Input type="password" name="password"
              placeholder="pas*****"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className={styles.button_group}>
            <CTA_Button type="submit" value="Login" />
            <Link to="/auth/password/forgot">
              <Outline_Button value="Forgot Passwords ?" />
            </Link>
          </div>
        </form>

      </div>
    </main>
  )
}