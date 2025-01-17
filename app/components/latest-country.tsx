import { GraphQLClient } from "graphql-request";
import PreloadQuery from "../lib/preload-query";
import { latestCountryQuery } from "../lib/queries";

export default async function LatestCountry() {
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_HOST}/graphql`,
    {
      cache: "no-store",
    }
  );
  const data = await new Promise((resolve) => {
    // setTimeout(() => {
    resolve(client.request(latestCountryQuery));
    // }, 3000);
  });

  return (
    <h1 style={{ textAlign: "center" }}>
      Latest country:
      {/* @ts-ignore */}
      <span key={data?.latest_country?.code}>{data?.latest_country?.name}</span>
    </h1>
  );
}
