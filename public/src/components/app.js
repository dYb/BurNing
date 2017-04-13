import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import styles from './app.css'
import Header from './header'
import CreatePerson from './create-person'
import SearchPerson from './search-person'

export default class App extends React.Component {
  state = {
    active: 1
  }
  changeTab = (active) => {
    this.setState({ active })
  }
  render () {
    return (
      <div>
        <Header active={this.state.active} changeTab={this.changeTab} />
        <div className="container">
          <CSSTransitionGroup 
            transitionName="example"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={300} >
            {this.state.active === 0 ? <CreatePerson key="create" />: <SearchPerson key="search" />}
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
} 

