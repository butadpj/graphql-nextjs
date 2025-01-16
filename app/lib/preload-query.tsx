import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createApolloClient, getApolloClient } from "./apollo-client";
import { GraphQLClient, gql } from "graphql-request";

type PreloadQueryProps = {
  query: ReturnType<typeof gql>; // GraphQL query
  variables?: Record<string, any>; // Query variables
  children:
    | React.ReactNode
    | ((props: {
        data: any;
        initialApolloState: NormalizedCacheObject | any;
      }) => React.ReactNode);
};

export default async function PreloadQuery({
  query,
  variables,
  children,
}: PreloadQueryProps) {
  // const client = createApolloClient();
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_HOST}/api/graphql`,
    {
      cache: "force-cache",
    }
  );

  // Fetch data on the server
  // const { data } = await client.query({
  //   query,
  //   variables,
  // });

  const data = await client.request(query);

  // // Extract the cache state after fetching
  // const initialApolloState = client.cache.extract();

  if (typeof children !== "function") return <>{children}</>;

  return <>{children({ data, initialApolloState: "" })}</>;
}
