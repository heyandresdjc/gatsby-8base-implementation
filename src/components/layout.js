import React from "react"
import PropTypes from "prop-types"
import { ApolloProvider } from 'react-apollo'
import { client } from "../../EightBase";

const Layout = ({ children }) => (
  <ApolloProvider client={client}>
    <main>
      {children}
    </main>
  </ApolloProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout