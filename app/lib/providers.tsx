"use client";

import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "./apollo-client";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { getQueryClient } from "./query-client";

interface ProvidersProps {
  initialApolloState?: any;
  children: React.ReactNode;
}

// const client = getApolloClient();
// const queryClient = new QueryClient();

export default function Providers({
  initialApolloState,
  children,
}: ProvidersProps) {
  // // Instead do this, which ensures each request has its own cache:
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           // With SSR, we usually want to set some default staleTime
  //           // above 0 to avoid refetching immediately on the client
  //           staleTime: 60 * 1000,
  //         },
  //       },
  //     })
  // );

  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryStreamedHydration> */}
        {/* <ApolloProvider client={client}> */}
        {children}
        {/* </ApolloProvider> */}
        {/* </ReactQueryStreamedHydration> */}
      </QueryClientProvider>
    </>
  );
}
