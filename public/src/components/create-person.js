import React from 'react'

export default class CreatePerson extends React.Component {
  addPerson = (e) => {
    e.preventDefault()
    console.log(this.name.value, this.email.value)
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="personName">Person Name</label>
          <input type="text" className="form-control" ref={(input) => { this.name = input }} id="personName" placeholder="Name" />
        </div>
        <div className="form-group">
          <label htmlFor="personEmail">Email</label>
          <input type="email" className="form-control" ref={(input) => { this.email = input }} id="personEmail" placeholder="Email" />
        </div>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-primary" onClick={this.addPerson}>Add</button>
          </div>
        </div>
      </form>
    )
  }
}
