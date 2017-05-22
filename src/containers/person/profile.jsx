import React from 'react'
import { Link } from 'react-router-dom'

export default class Profile extends React.PureComponent {
  componentDidMount() {
    const { id, fetchProfile, profile } = this.props
    if (!profile) {
      fetchProfile({ id })
    }
  }
  render() {
    const { id, authToken, profile, logout } = this.props
    if (!profile || !profile.name) {
      return <div>No person</div>
    }
    return (
      <div>
        <form>
          <div className="form-group row">
            <label className="col-2" htmlFor="id">ID</label>
            <div className="col-10" id="id">{profile.id}</div>
          </div>
          <div className="form-group row">
            <label className="col-2" htmlFor="name">name</label>
            <div className="col-10" id="name">{profile.name}</div>
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
          {
            authToken && authToken.id === id && <button onClick={logout} type="button" className="btn btn-danger btn-lg btn-block">LOGOUT</button>
          }
        </form>
      </div>
    )
  }
}
