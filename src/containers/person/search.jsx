import React from 'react'

export default class SearchPerson extends React.PureComponent {
  search = (e) => {
    e.preventDefault()
    const data = {}
    if (+this.id.value) {
      data['id'] = +this.id.value
    }
    if (this.name.value) {
      data['name'] = this.name.value
    }
    if (this.email.value) {
      data['email'] = this.email.value
    }
    this.props.searchPerson(data)
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="text" className="form-control" ref={(input) => { this.id = input }} id="id" placeholder="ID" />
        </div>
        <div className="form-group">
          <label htmlFor="personName">Person Name</label>
          <input type="text" disabled className="form-control" ref={(input) => { this.name = input }} id="personName" placeholder="Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" ref={(input) => { this.email = input }} id="email" placeholder="Email" />
        </div>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.search}>Search</button>
          </div>
        </div>
        {
          this.props.result && (
            <ul className="border">
              {
                this.props.result.map(p => (
                  <li key={p.id}>
                    ID: {p.id} name: {p.name} email: {p.email}<br />
                    POST: {p.post}
                  </li>
                ))
              }
            </ul>
          )
        }
      </form>
    )
  }
}
