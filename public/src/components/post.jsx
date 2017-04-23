import React from 'react'

export default class Post extends React.PureComponent {
  componentDidMount() {
    const { post, fetchPost } = this.props
    const { id, content } = post || {}
    if (!content) {
      fetchPost(id)
    }
  }
  render() {
    const { title, content } = this.props.post || {}
    return (
      <div>
        <h2>{title}</h2>
        <div>
          {content || 'loading...'}
        </div>
      </div>
    )
  }
}

