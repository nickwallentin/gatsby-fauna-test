// src/gatsby-theme-apollo/client.js
import fetch from "isomorphic-fetch"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graphql.fauna.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SERVER_KEY}`,
    },
    fetch,
  }),
})

export default client
