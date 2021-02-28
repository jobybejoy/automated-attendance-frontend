import { useState } from "react"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from "../../pages/Auth/Login"
import ForgotPassword from "../../pages/Auth/ForgotPassword";
import useToken from "./useToken";


function Home() {
  return (
    <h2>Home</h2>
  );
}

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
          </RequireAuth>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
