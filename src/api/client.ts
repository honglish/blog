import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: `https://graphqlzero.almansi.me/api`,
});

export const client = new ApolloClient({
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
  link: from([httpLink]),
  cache: new InMemoryCache(),
});

export default client;
