import React from 'react'
import { Link } from 'react-router-dom'

export default class PostList extends React.Component {
  componentDidMount() {
    const { fetchPostList, list } = this.props
    if (!list || !list.length) {
      fetchPostList()
    }
  }
  render() {
    const { list } = this.props
    if (!list || !list.length) {
      return <div>loading....</div>
    }
    return (
      <ul>
        {
          list.map(post => (
            <li key={post.id}><Link to={{
              pathname: '/post/' + post.id,
              state: { post }
            }}>{post.title}</Link></li>
          ))
        }
      </ul>
    )
  }
}

