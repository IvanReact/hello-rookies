import { React } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (token) {
    return <Switch>
      <Redirect exact from="/" to="/candidates"></Redirect>
      <Route path="/" ><HomePage setToken={setToken} /></Route>
    </Switch>
  }

  if (!token) {
    return <Switch>
      <Redirect from="/candidates" to="/" />
      <Redirect from="/interviews" to="/" />
      <Route path='/' >
        <Login setToken={setToken}></Login>
      </Route>
    </Switch>
  }
};
export default App;
