import React from 'react'
import { Link } from 'react-router-dom'

const Forbidden = ({ history }) => (
  <div style={{marginTop: '20px'}}>
    <div>
      <h2>403 ~ Forbidden</h2>
      <Link to="/login" className="btn btn-lg btn-success">LOGIN TO VIEW</Link>
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

export default Forbidden
