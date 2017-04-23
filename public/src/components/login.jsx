import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends React.PureComponent {
  login = (e) => {
    e.preventDefault()
    const email = this.email.value
    const password = this.password.value
    if (!email || !password) return
    this.props.doLogin({ email, password })
    this.email.value = ''
    this.password.value = ''
  }
  render() {
    const { authToken, location } = this.props
    const from = location.state ? location.state.from : { pathname: '/' }

    if (authToken && authToken.isAdmin) {
      return <Redirect to={from} />
    }
    return (
      <form>
        <h2>Login</h2>
        <div className="form-group">
          <label className="col-form-label col-form-label-lg" htmlFor="personEmail">Email:</label>
          <input type="email" className="form-control form-control-lg" ref={(input) => { this.email = input }} id="personEmail" placeholder="Email" />
        </div>
        <div className="form-group">
          <label className="col-form-label col-form-label-lg" htmlFor="password">Password:</label>
          <input type="password" className="form-control form-control-lg" ref={(input) => { this.password = input }} id="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.login}>Login</button>
        </div>
      </form>
    )
  }
}
