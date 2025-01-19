"use client";

import request, { GraphQLClient } from "graphql-request";
import PreloadQuery from "../lib/preload-query";
import { latestCountryQuery } from "../lib/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function LatestCountry() {
  const { data } = useSuspenseQuery({
    queryKey: ["latest-country"],
    queryFn: async () => {
      return request(
        `${process.env.NEXT_PUBLIC_HOST}/graphql`,
        latestCountryQuery
      );
      // return new Promise((resolve) => {
      //   setTimeout(
      //     () =>
      //       resolve(
      //         request(
      //           `${process.env.NEXT_PUBLIC_HOST}/graphql`,
      //           latestCountryQuery
      //         )
      //       ),
      //     5000
      //   );
      // });
    },
  });

  return (
    <h1 style={{ textAlign: "center" }}>
      Latest country:
      {/* @ts-ignore */}
      <span key={data?.latest_country?.code}>{data?.latest_country?.name}</span>
    </h1>
  );
}
