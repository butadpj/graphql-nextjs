"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
// import { gql, useQuery } from "@apollo/client";
import { countryListsQuery } from "../lib/queries";
import request from "graphql-request";

export default function CountryLists({
  initialData = null,
}: {
  initialData?: any;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["countries"],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(
          () =>
            resolve(
              request(
                `${process.env.NEXT_PUBLIC_HOST}/api/graphql`,
                countryListsQuery
              )
            ),
          5000
        );
      }),

    ...(initialData !== null && { initialData }),
  });

  // //@ts-ignore
  // if (!data?.countries) {
  //   return "Loading...";
  // }

  return (
    <div
      style={{
        padding: "1rem",
        background: "#36ff732c",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      <h1 style={{ opacity: "0.5" }}>Client-component</h1>
      <br />
      <ul
        style={{ display: "flex", flexDirection: "column", margin: "0 auto" }}
      >
        {/* @ts-ignore */}
        {data?.countries.map((country: any, index) => (
          <li
            key={country.code}
            style={{ ...(index === 0 && { color: "greenyellow" }) }}
            className={index === 0 ? "latest-country" : ""}
          >
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
