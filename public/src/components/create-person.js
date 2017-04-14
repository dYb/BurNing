import React from 'react'

export default class CreatePerson extends React.Component {
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
            <button type="submit" className="btn btn-primary" onClick={(e) => {
              e.preventDefault()
              this.props.addPerson({name: this.name.value, email: this.email.value })
            }}>Add</button>
          </div>
        </div>
        {
          this.props.newPerson && (
            <div className="border">
              <div className="alert alert-success" role="alert">
                <strong>Well done!</strong> You successfully create a person.
              </div>
              <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">ID:</label>
                <div className="col-10">{this.props.newPerson.id}</div>
              </div>
              <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">NAME:</label>
                <div className="col-10">{this.props.newPerson.name}</div>
              </div>
              <div className="form-group row">
                <label htmlFor="example-text-input" className="col-2 col-form-label">EMAIL:</label>
                <div className="col-10">{this.props.newPerson.email}</div>
              </div>
            </div>
          )
        }
      </form>
    )
  }
}
