import * as React from "react"
import Navigation from "../navigation/navigation"
import "./login-page.css"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { Link } from "react-router-dom"

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        username
        email
      }
    }
  }
`

class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <Mutation mutation={LOGIN}>
          {login => {
            return (
              <div className="MainPart">
                <div id="sky">
                  <div id="clouds" />
                </div>

                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    const { data } = await login({
                      variables: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    })
                    // console.log({ data })
                    localStorage.setItem("token", data.login.token)
                    localStorage.setItem("username", data.login.user.username)
                    this.props.history.push("/")
                  }}
                >
                  <div className="inputBox">
                    <b>Email:</b>
                    <br />
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ email: e.target.value })
                      }}
                      placeholder="email"
                    />
                    <br />
                    <b>Password:</b>
                    <br />
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ password: e.target.value })
                      }}
                      placeholder="password"
                    />
                  </div>
                  <button type="submit" className="LoginButton">
                    LOGIN!
                  </button>
                </form>
                <h1>See what’s happening in iXperience right now</h1>

                <h3>You don't have an account?</h3>
                <Link to="/signup">
                  <button className="SignupButton">Sign up</button>
                </Link>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default LoginPage
