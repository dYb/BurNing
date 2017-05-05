import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Login extends React.PureComponent {
  state = { clicked: false }
  login = async (e) => {
    e.preventDefault()
    const email = this.email.value
    const password = this.password.value
    const remember = this.remember.checked
    if (!email || !password) return
    await this.props.doLogin({ email, password }, remember)
    this.setState({ clicked: true })
    this.email.value = ''
    this.password.value = ''
  }
  render() {
    const { authToken, location } = this.props
    const from = location.state ? location.state.from : { pathname: '/' }

    if (authToken) {
      return <Redirect to={from} />
    }
    return (
      <form>
        <h2>Sign In</h2>
        <div className="form-group">
          <label className="col-form-label col-form-label-lg" htmlFor="personEmail">Email:</label>
          <input type="email" className="form-control form-control-lg" ref={(input) => { this.email = input }} id="personEmail" placeholder="Email" />
        </div>
        <div className="form-group">
          <label className="col-form-label col-form-label-lg" htmlFor="password">Password:</label>
          <input type="password" className="form-control form-control-lg" ref={(input) => { this.password = input }} id="password" placeholder="Password" />
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" defaultChecked ref={(input) => { this.remember = input }} className="form-check-input" />
            &nbsp;Remember me in 7 days
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.login}>Sign In</button>
        </div>
        {
          this.state.clicked && !authToken && <div className="alert alert-danger" role="alert">
            <strong>Failed!</strong>
          </div>
        }
      </form>
    )
  }
}
