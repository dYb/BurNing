import React from 'react'
import Fobidden from './403.jsx'
import NotFound from './404.jsx'

export default class Post extends React.PureComponent {
  state = { loaded: false }
  componentDidMount() {
    const { post, fetchPost } = this.props
    const { id, content } = post || {}
    if (!content) {
      fetchPost({ id: +id })
      this.setState({
        loaded: true
      })
    }
  }
  render() {
    const { post, authToken } = this.props
    const { title, content, outward, person } = (post || {})
    const { id, name, email } = (person || {})
    // 文章拥有者 && 加载过数据 && 仍然没有内容
    if (authToken && authToken.id === id && this.state.loaded && !content) {
      return <NotFound />
    }
    // 不是公开的 && 不是文章拥有者
    if (!outward && !content && this.state.loaded) {
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

