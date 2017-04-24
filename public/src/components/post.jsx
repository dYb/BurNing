import React from 'react'
import Fobidden from './403.jsx'
import NotFound from './404.jsx'

export default class Post extends React.PureComponent {
  state = { loaded: false }
  componentDidMount() {
    const { post, fetchPost, authToken } = this.props
    const { id, content } = post || {}
    if (!content && authToken) {
      fetchPost({ id: +id })
      this.setState({
        loaded: true
      })
    }
  }
  render() {
    const { post, authToken } = this.props
    const { title, content, outward, person } = post || {}
    const { id, name, email } = person || {}
    if (this.state.loaded && !content) {
      return <NotFound />
    }
    if (!outward && (!authToken || authToken.id !== id) && !this.state.loaded) {
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

