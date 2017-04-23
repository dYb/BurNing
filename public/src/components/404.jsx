import React from 'react'

const NotFound = ({ history }) => (
  <div style={{marginTop: '20px'}}>
    <div>
      <h2>404 ~ NOT FOUND</h2>
      <button onClick={(e) => {
        if (history.length < 1) {
          history.push('/')
        } else {
          history.goBack()
        }
      }} type="button" className="btn btn-lg btn-link">Back</button>
    </div>
  </div>
)

export default NotFound
