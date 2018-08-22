import * as React from "react"
import "./profile-window.css"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const GET_INFORMATION = gql`
  query {
    me {
      following {
        username
      }
      followers {
        username
      }
      tweets {
        createdAt
      }
    }
  }
`

class ProfileWindow extends React.Component {
  render() {
    return (
      <Query query={GET_INFORMATION}>
        {({ loading, error, data, refetch }) => {
          // console.log({ data })

          if (loading) {
            return "LOading..."
          }
          if (error) {
            return "OOoops, somehing blew up."
          }
          return (
            <div className="profile-window-wrapper">
              <div className="profile-window-image" />
              <div className="information">
                <div className="tweets">
                  <div>Tweets</div>
                  <div>{data.me.tweets.length}</div>
                </div>
                <div className="following">
                  <div>Following</div>
                  <div>{data.me.following.length}</div>
                </div>

                <div className="followers">
                  <div>Followers</div>
                  <div>{data.me.followers.length}</div>
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ProfileWindow
