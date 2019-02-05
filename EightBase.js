import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';

const AUTH_TOKEN = '1d725c37-312c-4534-ae5c-6e733e85de59';
const ENDPOINT = 'https://api.8base.com/cjrmowyc0000001qghp3ajxap'

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