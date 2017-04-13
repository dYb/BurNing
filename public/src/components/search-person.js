import React from 'react'

export default class SearchPerson extends React.Component {
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
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </div>
        </div>
      </form>
    )
  }
}
