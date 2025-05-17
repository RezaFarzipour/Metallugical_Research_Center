
"use client";

import createApolloClient from "@/services/apollo-client";
import { ApolloProvider } from "@apollo/client";


const client = createApolloClient();

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
