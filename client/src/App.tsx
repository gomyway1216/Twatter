import * as React from "react"
import { hot } from "react-hot-loader"
import { Switch, Route } from "react-router-dom"
import HomePage from "./components/home-page/home-page"
import LoginPage from "./components/login-page/login-page"
import ProfilePage from "./components/profile-page/profile-page"
import SignUP from "./components/signup/signup"
import Notification from "./components/notification/notification"
import AllUsersPage from "./components/allUsers/allUsers"
import "./App.css"

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/users" component={AllUsersPage} />
          <Route exact={true} path="/signup" component={SignUP} />
          <Route exact={true} path="/:username" component={ProfilePage} />
          <Route exact={true} path="/notification" component={Notification} />
        </Switch>
      </div>
    )
  }
}

export default hot(module)(App)
