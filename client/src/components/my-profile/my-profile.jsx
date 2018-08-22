import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Nagigation from "../navigation/navigation"
import Tweet from "../tweet/tweet"

const GET_MY_PROFILE = gql`
  query getMyProfile {
    me {
      id
      name
      username
      email
      tweets {
        id
        text
      }
    }
  }
`

class MyProfile extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="profile-page">
          <h1>THIS IS PROFILE PAGE {this.props.match.params.username}</h1>

          {/* <div>
            token = localStorage.getItem("token")
            </div> */}

          <Query query={GET_MY_PROFILE}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return "Loading..."
              }

              if (error) {
                return "Oops, something blew up."
              }

              return (
                <div>
                  {data.me.tweets.map(tweet => {
                    return (
                      <Tweet
                        key={tweet.id}
                        text={tweet.text}
                        author={tweet.author}
                      />
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

export default MyProfile
