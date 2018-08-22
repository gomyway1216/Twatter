import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import CreateTweet from "../create-tweet-form/create-tweet-form"

const GET_TWEETS = gql`
  query {
    feed {
      id
      text
      author {
        id
        name
      }
    }
  }
`

class Notification extends React.Component {
  render() {
    return (
      <div>
        <Query query={GET_TWEETS}>
          {({ loading, error, data, refetch }) => {
            // console.log({ data })

            if (loading) {
              return "LOading..."
            }
            if (error) {
              return "OOps, somehing blew up."
            }
            return (
              <div>
                <CreateTweet refetchFeedTweets={refetch} />
                {data.feed.map(tweet => {
                  return (
                    <div className="eachTweet">
                      {tweet.text}
                      <div className="tweet-author">{tweet.author.name}</div>
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Notification
