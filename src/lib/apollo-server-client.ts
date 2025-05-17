//use apollo for server side fetching
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const createServerApolloClient = () => {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
};

export default createServerApolloClient;
