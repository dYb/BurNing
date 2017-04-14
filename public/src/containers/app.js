import React from 'react'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import styles from './app.css'
import Header from '../components/header'
import CreatePerson from '../components/create-person'
import SearchPerson from '../components/search-person'

import * as actions from '../actions'

class App extends React.Component {
  changeTab = (active) => {
    this.props.changeTab(active)
  }
  render () {
    return (
      <div>
        <Header active={this.props.active} changeTab={this.changeTab} />
        <div className="container">
          <CSSTransitionGroup 
            transitionName="example"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={300} >
            {this.props.active === 0 ? <CreatePerson key="create" newPerson={this.props.newPerson} addPerson={this.props.addPerson} /> : <SearchPerson key="search" />}
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
} 
const mapStateToProps = state => state

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: active => dispatch(actions.changeTab(active))
  }
}

export default connect(mapStateToProps, actions)(App)
