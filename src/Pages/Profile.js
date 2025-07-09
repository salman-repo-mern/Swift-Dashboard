import  { Component } from "react";
import "./style.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ user: data[0], loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  render() {
    const { user, loading, error } = this.state;
    const { navigateTo } = this.props;

    if (loading) {
      return (
        <div className="spinner-container">
          <div className="loader-circles">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="loading-text">Loading profile data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <p className="error-text">Error: {error}</p>
        </div>
      );
    }

    return (
      <div className="profile-wrapper">
        {user && (
          <div className="header">
            <button
              className="back-button"
              onClick={() => navigateTo("dashboard")}
              aria-label="Go back to dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="back-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="welcome-text">Welcome, {user.name}</h2>
          </div>
        )}

        <div className="profile-card">
          {user ? (
            <>
              <div className="basic-info">
                <div className="avatar">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div> 
                  <h3 id="profile-username" >{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">User ID</span>
                  <div className="value">{user.id}</div>
                </div>

                <div className="detail-item">
                  <span className="label">Name</span>
                  <div className="value">{user.name}</div>
                </div>

                <div className="detail-item">
                  <span className="label">Email ID</span>
                  <div className="value">{user.email}</div>
                </div>

                <div className="detail-item">
                  <span className="label">Address</span>
                  <div className="value">
                    {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                  </div>
                </div>

                <div className="detail-item">
                  <span className="label">Phone</span>
                  <div className="value">{user.phone}</div>
                </div>

              </div>
            </>
          ) : (
            <p className="no-data">No user data available.</p>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
