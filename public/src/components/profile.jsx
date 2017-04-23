import React from 'react'
import { Redirect, Link } from 'react-router-dom'

export default class Profile extends React.PureComponent {
  componentDidMount() {
    const { authToken, fetchProfile, profile } = this.props
    if (authToken && !profile) {
      fetchProfile(authToken.id)
    }
  }
  render() {
    const { authToken, profile, doLogout } = this.props
    if (!authToken) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          from: { pathname: '/profile' }
        }
      }} />
    }
    if (!profile) {
      return null
    }
    return (
      <div>
        <form>
          <div className="form-group row">
            <label className="col-2" htmlFor="id">ID</label>
            <div className="col-10" id="id">{profile.id}</div>
          </div>
          <div className="form-group row">
            <label className="col-2" htmlFor="email">email</label>
            <div className="col-10" id="email">{profile.email}</div>
          </div>
          <div className="form-group row">
            <label className="col-2" htmlFor="posts">posts</label>
            <ul className="col-10">
              {
                profile.posts && profile.posts.map((post) => {
                  return <li key={post.id}>
                    <Link to={'/post/' + post.id} className="btn btn-link">{post.title}</Link>
                  </li>
                })
              }
            </ul>
          </div>
          <button onClick={doLogout} type="button" className="btn btn-danger btn-lg btn-block">LOGOUT</button>
        </form>
      </div>
    )
  }
}
