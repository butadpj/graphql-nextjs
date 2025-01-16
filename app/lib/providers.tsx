"use client";

import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "./apollo-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  initialApolloState?: any;
  children: React.ReactNode;
}

// const client = getApolloClient();
const client = new QueryClient();

export default function Providers({
  initialApolloState,
  children,
}: ProvidersProps) {
  return (
    <>
      <QueryClientProvider client={client}>
        {/* <ApolloProvider client={client}> */}
        {children}
        {/* </ApolloProvider> */}
      </QueryClientProvider>
    </>
  );
}
