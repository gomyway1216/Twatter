import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Mutation } from "react-apollo"
import Navigation from "../navigation/navigation"
import { Link } from "react-router-dom"
import Modal from "react-modal"

const GET_ALL_PROFILES = gql`
  query getMyProfile {
    users {
      id
      name
      username
      email
      tweets {
        id
        text
      }
      followers {
        id
        name
      }
    }
  }
`

const FOLLOW = gql`
  mutation follow($username: String!) {
    follow(username: $username) {
      username
      following {
        username
      }
    }
  }
`

class allUsers extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div>
          <Query query={GET_ALL_PROFILES}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return "Loading..."
              }

              if (error) {
                return "Oops, something blew up."
              }

              return (
                <div>
                  {data.users.length}
                  {data.users.map(user => {
                    return (
                      <Mutation mutation={FOLLOW}>
                        {(follow, { data, error }) => {
                          console.log(error)
                          return (
                            <div>
                              <div className="user">
                                {user.email},
                                {user.username}
                                FOLLOWERS: {user.followers.length}
                              </div>

                              <button
                                onClick={async () => {
                                  await follow({
                                    variables: {
                                      username: user.username
                                    }
                                  })
                                }}
                              >
                                Follow
                              </button>
                            </div>
                          )
                        }}
                      </Mutation>
                    )
                  })}
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default allUsers
