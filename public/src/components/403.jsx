import React from 'react'
import { withRouter } from 'react-router-dom'

const Forbidden = ({ history, location: { pathname } }) => (
  <div style={{marginTop: '20px'}}>
    <div>
      <h2>403 ~ Forbidden</h2>
      <button onClick={(e) => {
        e.preventDefault()
        history.replace('/login', { from: { pathname } })
      }} className="btn btn-lg btn-success">LOGIN TO VIEW</button>
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

export default withRouter(Forbidden)
