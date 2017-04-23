import React from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router'
import { NavLink, withRouter } from 'react-router-dom'
import routes from '../routes.js'

const Header = ({ authToken }) => (
  <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
    <ul className="navbar-nav mr-auto">
      {
        routes.map(route => {
          if (!route.name) {
            return null
          }
          // 仅管理员及未登录时显示
          if (authToken && !authToken.isAdmin) {
            return null
          }
          // 登录时隐藏
          if (route.hideWhenLogin && authToken) {
            return null
          }
          return (
            <li className="nav-item" key={route.name}>
              <NavLink exact activeClassName="active" className="nav-link" to={route.path}>{route.name}</NavLink>
            </li>
          )
        })
      }
    </ul>
  </nav>
)

export default withRouter(connect(state => ({ authToken: state.authToken }))(Header))
