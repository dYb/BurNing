import React from 'react'
import Fobidden from './403.jsx'
import { Redirect } from 'react-router-dom'

export default class CreatePerson extends React.PureComponent {
  render() {
    const result = this.props.personCreationResult
    const { addPerson, authToken } = this.props
    // 如果已登录，但不是管理员，则提示没有权限
    if (authToken && !authToken.isAdmin) {
      return <Fobidden />
    }
    // 未登录，跳转到登录页
    if (!authToken) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          from: { pathname: '/create-person' }
        }
      }} />
    }
    return (
      <form>
        <div className="form-group">
          <label htmlFor="personName">Person Name</label>
          <input type="text" className="form-control" ref={(input) => { this.name = input }} id="personName" placeholder="Name" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" ref={(input) => { this.password = input }} id="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="personEmail">Email</label>
          <input type="email" className="form-control" ref={(input) => { this.email = input }} id="personEmail" placeholder="Email" />
        </div>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-primary" onClick={(e) => {
              e.preventDefault()
              const name = this.name.value
              const email = this.email.value
              const password = this.password.value
              if (!name || !email || !password) return
              addPerson({ name, email, password })
              this.name.value = ''
              this.email.value = ''
              this.password.value = ''
            }}>Sign Up</button>
          </div>
        </div>
        {
          result !== undefined && (
            result.created
            ? <div className="alert alert-success" role="alert">
              <strong>Well done!</strong> You successfully create a person.
            </div>
            : <div className="alert alert-danger" role="alert">
              <strong>Error!</strong> {result.message}
            </div>
          )
        }
      </form>
    )
  }
}
