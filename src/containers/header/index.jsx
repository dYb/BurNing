import React from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import routes from '../../routes'

const Header = ({ authToken }) => (
  <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
    <ul className="navbar-nav mr-auto">
      {
        routes.map((route) => {
          if (!route.name) {
            return null
          }
          {/*// 仅管理员及未登录时显示
          if (authToken && !authToken.isAdmin) {
            return null
          }
          // 登录时隐藏
          if (route.hideWhenLogin && authToken) {
            return null
          }*/}
          return (
            <li className="nav-item" key={route.name}>
              <NavLink exact activeClassName="active" className="nav-link" to={route.path}>{route.name}</NavLink>
            </li>
          )
        })
      }
    </ul>
    <div className="my-5 my-lg-0">
      <Link to="/create-post" className="btn btn-outline-success mr-2 my-2 my-sm-2">+ POST</Link>
      {
        !authToken
        ? <Link to="/login" className="btn btn-outline-secondary my-2 my-sm-2">LOGIN</Link>
        : <Link to={'/profile/' + authToken.id} className="btn btn-outline-secondary ml-2 my-sm-2">PROFILE</Link>
      }
    </div>
  </nav>
)
export default compose(withRouter, connect(state => ({ authToken: state.auth.user })))(Header)
