import React from 'react'
import NotFound from 'components/404.jsx'

export default class Post extends React.PureComponent {
  componentDidMount() {
    const { post, fetchPost } = this.props
    const { id, content } = post || {}
    if (!content) {
      fetchPost({ id: +id })
    }
  }
  render() {
    const { post, authToken } = this.props
    const { title, outward, person } = (post || {})
    const { id, name, email } = (person || {})
    let content = post.content
    // 文章拥有者 && 加载过数据 && 仍然没有内容
    if (authToken && authToken.id === id && !content) {
      return <NotFound />
    }
    // 不是公开的 && 不是文章拥有者
    if (!outward && !content) {
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

