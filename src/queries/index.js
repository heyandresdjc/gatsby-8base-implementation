import gql from 'graphql-tag'

const GET_EMPLOYEES = gql`
{
    employeesList{
        items{
            id,
            fullName
            }
        }
}`

const GET_SINGLE_EMPLOYEE = gql`
query EmployeeByID($id: ID){
    employee(id: $id){
        id,
        fullName,
        currentJob{
            title
        },
        goalJob{
            title
        }
    }
}`

export { GET_EMPLOYEES, GET_SINGLE_EMPLOYEE }