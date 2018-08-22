import * as React from "react"
import Feed from "../feed/feed"
import Navigation from "../navigation/navigation"
import ProfileWindow from "../profile-window/profile-window"

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <div className="MainPart">
          <ProfileWindow />
          <div className="feed-main-content">
            <Feed />
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
