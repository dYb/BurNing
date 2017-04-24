import React from 'react'
import Fobidden from './403.jsx'

export default class Post extends React.PureComponent {
  componentDidMount() {
    const { post, fetchPost } = this.props
    const { id, content } = post || {}
    if (!content) {
      fetchPost({ id })
    }
  }
  render() {
    const { post, authToken } = this.props
    const { title, content, outward, person } = post || {}
    const { name, email } = person || {}
    if (!outward && (!authToken || authToken.id !== person.id)) {
      return <Fobidden />
    }
    return (
      <div>
        <h2>{title}</h2>
        <h4>{name} {email}</h4>
        <div>
          {content || 'loading...'}
        </div>
      </div>
    )
  }
}

