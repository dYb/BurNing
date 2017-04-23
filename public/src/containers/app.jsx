import React from 'react'
import { connect } from 'react-redux'
// import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// <CSSTransitionGroup
//   transitionName="fade"
//   transitionEnterTimeout={600}
//   transitionLeaveTimeout={600} >
// </CSSTransitionGroup>

import routes from '../routes'
import Header from './header.jsx'
import NotFound from '../components/404.jsx'
import * as actions from '../actions'

import './app.css'

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="container g-container">
          <Switch pathname={location.pathname} key={location.pathname}>
            {
              routes.map((route, i) => (
                <Route exact key={i} path={route.path} render={({ location }) => {
                  console.log('render!!!')
                  const mapStateToProps = (state, ownProps) => {
                    if (!route.props) return {}
                    const props = route.props.reduce((acc, curr) => {
                      return Object.assign({}, acc, {
                        [curr]: state[curr]
                      })
                    }, {})
                    return props
                  }
                  const actionCreators = !route.actions ? null : route.actions.reduce((acc, curr) => {
                    return Object.assign({}, acc, {
                      [curr]: actions[curr]
                    })
                  }, {})
                  const mergeProps = (stateProps, dispatchProps, ownProps) => {
                    return Object.assign({}, ownProps, stateProps, dispatchProps, { location })
                  }
                  const Connector = connect(mapStateToProps, actionCreators, mergeProps)(route.component)
                  return <Connector />
                }} />
              ))
            }
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
// export default connect(state => ({ authToken: state.authToken }))(App)
