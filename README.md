<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  8Based Gatsby
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the default starter.

    ```sh
    # create a new Gatsby site using the default starter
    gatsby new great-gatsby
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd great-gatsby/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `great-gatsby` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

    Awesome now that we verify the app is up and running lets add the client.

1. **Add Apollo Client**


    In the terminal run this commands

    ```sh
    yarn add apollo-boost react-apollo graphql apollo-link-context --save
    ```

1. **Create a file for the 8Base configurations**
    
    
    Add a config file for the 8Base connection

    ```javascript
    import { ApolloClient } from 'apollo-client'
    import { createHttpLink } from 'apollo-link-http'
    import { InMemoryCache } from 'apollo-cache-inmemory'
    import { setContext } from 'apollo-link-context';

    const AUTH_TOKEN = !YOUR_AUTH_TOKEN!;
    const ENDPOINT = !YOUR_8BASE!

    // 8base endpoint is placed in the uri
    const httpLink = createHttpLink({uri: ENDPOINT,});
    const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // place taoken in authorization
        authorization: AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : "",
      }
    }
    });
  
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    })

    export { client }
    ```

1. **Implement Client auth**


    go to src/components/layout.js

    ```javascript
    //head of the file
    import { StaticQuery, graphql } from "gatsby"
    import { ApolloProvider } from 'react-apollo'
    import { client } from "../../EightBase";
    ```

    then wrap the application main with apollo provider, use the element client with the client you just import from the config file

    ```javascript
      <ApolloProvider client={client}>
          <main>
              {children}
          </main>
      </ApolloProvider>
    ```
    *Great all now all of your app should be able to connect to 8Base with queries build in the component*

1. **Adding queries**
    
    
    1. ```sh
          cd src/
          mkdir queries
          touch queries/index.js
       ```
    
    1. Open and place your queries in there for example:
      ```javascript
      // list of all employees in the DB
      const GET_EMPLOYEES = gql`
              {
                  employeesList{
                      items{
                          id,
                          fullName
                          }
                      }
              }`
      ```
      or (passing a varivble)
      ```javascript
      // single object employee query
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
      ```
      *This are example queries your milage may vary based on your schema of the database

      ** if you are using this app are your base then al you have to do is to run this command.
      
      ```sh
        yarn install
      ```

    # *Happy hacking*