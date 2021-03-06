import { useState } from 'react';
import styles from './Login.module.css';

import { Link } from "react-router-dom"

import Label, { Helper } from "../../../components/Form/Label"
import Input from "../../../components/Form/Input"
import { InputGroup } from "../../../components/Form/Containers"
import ButtonGroup from "../../../components/Button/ButtonGroup"
import { CallToActionButton, OutlineButton } from "../../../components/Button"

import useToken from "../../../api/auth/useToken"

import { useHistory } from "react-router-dom";

import loginUser from "../../../api/auth/login"

export default function Login({ setToken }) {

  // console.log(typeof setToken)
  const history = useHistory();

  // Redirect to Home if Authenticated
  const { token } = useToken();
  if (token) {
    history.push("/")
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true)
    const token = await loginUser({
      username,
      password
    });
    console.log(typeof (setToken));
    setToken(token);

    setDisabled(false)

    // !In case of Failure Err handliong and stuff

    history.push("/");
  }


  return (
    <main className={styles.auth_container}>
      <div className={styles.box_container}>
        <h2>Please Log In</h2>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username"
              placeholder="johnDo1112"
              onChange={e => setUsername(e.target.value)}
              value={username}
              disabled={disabled}
              required
            />
            {/* <Helper>Enter email address here</Helper> */}
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password" >Password</Label>
            <Input type="password" name="password"
              placeholder="pas*****"
              onChange={e => setPassword(e.target.value)}
              value={password}
              disabled={disabled}
              required
            />
          </InputGroup>

          <ButtonGroup>
            <CallToActionButton type="submit" value="Login" disabled={disabled} />
            <Link to="/auth/password/forgot">
              <OutlineButton value="Forgot Passwords ?" />
            </Link>
          </ButtonGroup>

        </form>

      </div>
    </main >
  )
}