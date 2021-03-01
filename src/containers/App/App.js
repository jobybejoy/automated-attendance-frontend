import { useState } from "react"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import useToken from "./useToken";

// Public Routes
import Login from "../../pages/Auth/Login"
import ForgotPassword from "../../pages/Auth/ForgotPassword";

// Authenticated routes
import Home from "../../pages/Home"
import Profile from "../../pages/Profile"


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

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/password/forgot" component={ForgotPassword}></Route>

          <RequireAuth token={token}>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={Profile} />
          </RequireAuth>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
