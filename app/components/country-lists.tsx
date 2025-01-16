"use client";

import { useQuery } from "@tanstack/react-query";
// import { gql, useQuery } from "@apollo/client";
import { countryListsQuery } from "../lib/queries";
import request from "graphql-request";

export default function CountryLists({ initialData = null }) {
  const renderCountries = (countries = []) =>
    countries.map((country: any) => <li key={country.code}>{country.name}</li>);

  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: async () =>
      request("http://localhost:3000/api/graphql", countryListsQuery),
    initialData,
  });

  //@ts-ignore
  if (!data?.countries) {
    return "Loading...";
  }

  //@ts-ignore
  return <ul>{renderCountries(data?.countries)}</ul>;
}
