import * as React from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Navigation from "../navigation/navigation"
import "./signup.css"

const SIGNUP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $name: String!
    $username: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      username: $username
    ) {
      token
      user {
        id
        username
        name
        email
      }
    }
  }
`

class SignUP extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    username: ""
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <Mutation mutation={SIGNUP}>
          {signup => {
            return (
              <div>
                <form
                  className="signup-form"
                  onSubmit={async e => {
                    e.preventDefault()
                    try {
                      const { data } = await signup({
                        variables: {
                          email: this.state.email,
                          password: this.state.password,
                          name: this.state.name,
                          username: this.state.username
                        }
                      })
                      localStorage.setItem("token", data.signup.token)
                      this.props.history.push(`/myprofile`)
                    } catch (error) {
                      localStorage.removeItem("token")
                    }
                  }}
                >
                  <input
                    placeholder="name"
                    onChange={e => this.setState({ name: e.target.value })}
                  />

                  <input
                    placeholder="username"
                    onChange={e => this.setState({ username: e.target.value })}
                  />

                  <input
                    placeholder="email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />

                  <input
                    placeholder="password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />

                  <button type="submit" className="SignupButton">
                    SIGNUP!
                  </button>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default SignUP
