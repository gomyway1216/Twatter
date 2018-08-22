import * as React from "react"
import { Link } from "react-router-dom"
import "./navigation.css"
import HomeImage from "./image/home.png"
import NavigationImage from "./image/notification.png"
import Search from "react-search-box"

class Navigation extends React.Component {
  onLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    this.props.history.push("/login")
  }
  render() {
    const token = localStorage.getItem("token")
    return (
      <div className="navigation">
        <div>
          <Link to="/">
            <img src={HomeImage} alt={" Home Icon "} />
          </Link>

          <Link to="/notification">
            <img src={NavigationImage} alt={" Notification Icon "} />
          </Link>
        </div>

        <Link to={"/" + localStorage.getItem("username")}>My Profile Page</Link>

        {/* <Search
          data={this.state.data}
          onChange={this.handleChange.bind(this)}
          placeholder="Search for a string..."
          class="search-class"
          searchKey="full_name"
        /> */}

        <div>
          {token ? (
            <button onClick={this.onLogout}>logout</button>
          ) : (
            <Link to="/login">login</Link>
          )}
        </div>
        {token ? null : <Link to="/signup">signup</Link>}
      </div>
    )
    // return <div className="navigation">Hello</div>
  }
}

export default Navigation
