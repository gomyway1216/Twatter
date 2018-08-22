import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Navigation from "../navigation/navigation"
import Tweet from "../tweet/tweet"
import ProfileWindow from "../profile-window/profile-window"
import "./profile-page.css"
import CreateTweetForm from "../create-tweet-form/create-tweet-form"

const GET_TWEETS = gql`
  query getTweets($where: TweetWhereInput) {
    feed(orderBy: createdAt_DESC, where: $where) {
      id
      text
      createdAt
      author {
        id
        name
      }
    }
  }
`

const GET_FOLLOW_FOLLOWERS = gql`
  query {
    me {
      following {
        username
      }
      followers {
        username
      }
    }
  }
`

class ProfilePage extends React.Component {
  render() {
    // console.log({
    //   username: this.props.match.params
    // })
    return (
      <div>
        <Navigation history={this.props.history} />

        <Query query={GET_FOLLOW_FOLLOWERS}>
          {({ loading, error, data, refetch }) => {
            // console.log({ data })

            if (loading) {
              return "LOading..."
            }
            if (error) {
              return "OOoops, somehing blew up."
            }
            return (
              <div>
                <h1>Following</h1>
                <h3>You have {data.me.following.length} following</h3>
                {data.me.following.map(user => {
                  return <div>{user.username}</div>
                })}

                <h1>Followers</h1>
                <h3>You have {data.me.followers.length} followers</h3>
                {data.me.followers.map(user => {
                  return <div>{user.username}</div>
                })}
              </div>
            )
          }}
        </Query>

        <div className="profile-page">
          {/* <h1>THIS IS THE PROFILE PAGE {this.props.match.params.username}</h1> */}
          <ProfileWindow />
          <div className="profile-page-feed">
            <Query
              variables={{
                where: {
                  author: {
                    username: this.props.match.params.username
                  }
                }
              }}
              query={GET_TWEETS}
            >
              {({ loading, error, data, refetch }) => {
                if (loading) {
                  return "It is loading now..."
                }
                if (error) {
                  return "Hey, something is wrong..."
                }
                return (
                  <div>
                    <CreateTweetForm refetchFeedTweets={refetch} />
                    <div className="eachTweet1">
                      {data.feed.map(tweet => {
                        return (
                          <Tweet
                            key={tweet.id}
                            text={tweet.text}
                            author={tweet.author}
                            createdAt={tweet.createdAt}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              }}
            </Query>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage
