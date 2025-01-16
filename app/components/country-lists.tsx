"use client";

import { useQuery } from "@tanstack/react-query";
// import { gql, useQuery } from "@apollo/client";
import { countryListsQuery } from "../lib/queries";
import request from "graphql-request";

export default function CountryLists({
  initialData = null,
}: {
  initialData?: any;
}) {
  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () =>
      request(`${process.env.NEXT_PUBLIC_HOST}/api/graphql`, countryListsQuery),
    ...(initialData !== null && { initialData }),
  });

  //@ts-ignore
  if (!data?.countries) {
    return "Loading...";
  }

  
  return (
    <ul>
      {/* @ts-ignore */}
      {data?.countries.map((country: any) => (
        <li key={country.code}>{country.name}</li>
      ))}
    </ul>
  );
}
