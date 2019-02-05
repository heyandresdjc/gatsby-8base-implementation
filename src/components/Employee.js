import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { GET_SINGLE_EMPLOYEE } from "../queries/index";


export default class Employee extends Component {
  state = {
    id: "cjrnnfvx4006v01pd02v6kwvf"
  }
  render() {
    let id = this.state;
    return (
      <Query query={GET_SINGLE_EMPLOYEE} variables={id}>
      {({ loading, error, data }) => {
        if (loading) return <h1>Fetching</h1>
        if (error) return <h1>Error</h1>
        const EmployeeToRender = data.employee
        return (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{EmployeeToRender.fullName}</h5>
                <p className="card-text">{EmployeeToRender.currentJob.title}</p>
                <p className="card-text">{EmployeeToRender.goalJob.title}</p>
              </div>
            </div>
            )
          }}
        </Query>)}
}