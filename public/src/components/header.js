import React from 'react'

const Header = ({ active, changeTab }) => {
  return (
    <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
      <ul className="navbar-nav mr-auto">
        <li className={'nav-item' + (active === 0 ? ' active' : '')} onClick={() => { changeTab(0) }}>
          <a className="nav-link" href="#">Add Person</a>
        </li>
        <li className={'nav-item' + (active === 1 ? ' active' : '')} onClick={() => { changeTab(1) }}>
          <a className="nav-link" href="#">Search</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
      </ul>
    </nav>
  )
}

export default Header
