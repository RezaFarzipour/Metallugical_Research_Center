import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://127.0.0.1:8000/api/v1/graphql/blogs",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;