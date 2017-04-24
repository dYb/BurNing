import React from 'react'
import Fobidden from './403.jsx'
import { Redirect } from 'react-router-dom'

export default class CreatePost extends React.PureComponent {
  render() {
    const result = this.props.postCreationResult
    const { addPost, authToken } = this.props
    // 如果已登录，但不是管理员，则提示没有权限
    if (authToken && !authToken.isAdmin) {
      return <Fobidden />
    }
    // 未登录，跳转到登录页
    if (!authToken) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          from: { pathname: '/create-post' }
        }
      }} />
    }
    return (
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" ref={(input) => { this.title = input }} id="title" placeholder="Title" />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea type="text" className="form-control" ref={(input) => { this.content = input }} id="content" placeholder="Content" />
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-success btn-lg" onClick={(e) => {
              e.preventDefault()
              const title = this.title.value
              const content = this.content.value
              if (!title || !title) return
              addPost({ title, content })
              this.title.value = ''
              this.content.value = ''
            }}>Add</button>
            <button type="reset" className="btn btn-secondary btn-lg ml-2" onClick={(e) => {
            }}>Reset</button>
          </div>
        </div>
        {/*{
          result !== null && (
            result.created
            ? <div className="alert alert-success" role="alert">
              <strong>Well done!</strong> You successfully create a person.
            </div>
            : <div className="alert alert-danger" role="alert">
              <strong>Error!</strong> {result.message}
            </div>
          )
        }*/}
      </form>
    )
  }
}
