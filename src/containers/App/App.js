import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import useToken from "./useToken";

// Public Routes
import Login from "../../pages/Auth/Login"
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import SignUp from "../../pages/Auth/SignUp"
import ResetPassword from "../../pages/Auth/ResetPassword"

// Authenticated routes
import Home from "../../pages/Home"
import Profile from "../../pages/Profile"
import EditProfile from "../../pages/Profile/Edit"
import StudentAttendance from "../../pages/Attendance/Student/index"

import useUser from "../../api/user"
import useSessions from "../../api/sessions"

import { UserContext } from "../../context/UserContext"
import { SessionsContext } from "../../context/SessionsContext"


// Authenticated Routes HOC
const RequireAuth = ({ children, token }) => {
  if (!token) {
    return <Redirect to={"/auth/login"} />;
  }
  return children;
};

function App() {

  //Using custom Token Hook 
  const { token, setToken } = useToken();
  const { user, isError, isLoading } = useUser();
  const { sessions, isError: isSessionsError, isLoading: isSessionsLoading } = useSessions();
  // console.log({ sessions });
  // const [user, setUser] = useState({ name: "John doe", email: "email@njit.edu", department: "Computer Science", phone_number: "+1 551 263 9920", address: "Some place, Sowhere\nState country\nzip" })

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth/login" component={() => <Login setToken={setToken} />} />
          <Route exact path="/auth/signup" component={SignUp} />
          <Route exact path="/auth/password/forgot" component={ForgotPassword}></Route>
          <Route exact path="/auth/password/reset" component={ResetPassword}></Route>

          <RequireAuth token={token}>
            <UserContext.Provider value={{ user, isError, isLoading }}>
              <SessionsContext.Provider value={{ sessions, isError: isSessionsError, isLoading: isSessionsLoading }}>
                <Route path="/" exact component={() => <Home />} />
                <Route path="/:department/:course_number/session/:session_id" component={() => <StudentAttendance />} />
              </SessionsContext.Provider>

              <Route path="/profile" exact component={() => <Profile />} />
              <Route path="/profile/edit" exact component={() => <EditProfile />} />
            </UserContext.Provider>
          </RequireAuth>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
