import React from 'react'
import { Link } from 'react-router-dom'

export default class PostList extends React.Component {
  componentDidMount() {
    const { fetchPostList } = this.props
    fetchPostList()
  }
  render() {
    const { postList } = this.props
    if (!postList || !postList.length) {
      return <div>loading....</div>
    }
    return (
      <ul>
        {
          postList.map(post => (
            <li key={post.id}><Link to={'/post/' + post.id}>{post.title}</Link></li>
          ))
        }
      </ul>
    )
  }
}

