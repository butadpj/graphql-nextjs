import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

// Declare a variable to hold the Apollo Client instance
let apolloClient: ApolloClient<NormalizedCacheObject>;

export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:3000/api/graphql", // Example GraphQL API
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}

// Export a function to retrieve the singleton instance
export function getApolloClient() {
  // Create a new client if there's no existing one
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }

  return apolloClient;
}
