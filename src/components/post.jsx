import React from 'react'
import NotFound from './404.jsx'

export default class Post extends React.PureComponent {
  state = { loaded: false }
  componentDidMount() {
    const { post, fetchPost } = this.props
    const { id, content } = post || {}
    if (!content) {
      fetchPost({ id: +id }).then(() => {
        this.setState({
          loaded: true
        })
      })
    }
  }
  render() {
    const { post, authToken } = this.props
    const { title, outward, person } = (post || {})
    const { id, name, email } = (person || {})
    let content = post.content
    // 文章拥有者 && 加载过数据 && 仍然没有内容
    if (authToken && authToken.id === id && this.state.loaded && !content) {
      return <NotFound />
    }
    // 不是公开的 && 不是文章拥有者
    if (!outward && !content && this.state.loaded) {
      content = 'content is not visiable'
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
