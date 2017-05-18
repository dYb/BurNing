import React from 'react'
import { Link } from 'react-router-dom'
import { compose, lifecycle, pure } from 'recompose'

const PostList = (props) => {
  const { postList } = props
  if (!postList || !postList.length) {
    return <div>loading....</div>
  }
  return (
    <ul>
      {
        postList.map(post => (
          <li key={post.id}><Link to={{
            pathname: '/post/' + post.id,
            state: { post }
          }}>{post.title}</Link></li>
        ))
      }
    </ul>
  )
}
export default compose(lifecycle({
  componentDidMount() {
    const { fetchPostList, postList } = this.props
    if (!postList || !postList.length) {
      fetchPostList()
    }
  }
}), pure)(PostList)

