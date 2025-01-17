"use client";

import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "./apollo-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

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
  // Instead do this, which ensures each request has its own cache:
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ApolloProvider client={client}> */}
        {children}
        {/* </ApolloProvider> */}
      </QueryClientProvider>
    </>
  );
}
