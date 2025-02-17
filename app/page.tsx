import Image from "next/image";
import styles from "./page.module.css";
import CountryLists from "./components/country-lists";
import PreloadQuery from "./lib/preload-query";
import Link from "next/link";
import { countryListsQuery, latestCountryQuery } from "./lib/queries";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import LatestCountry from "./components/latest-country";
import { getQueryClient } from "./lib/query-client";

// export const dynamic = "force-dynamic";
export const revalidate = 30;

export default async function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["countries"],
    queryFn: async () =>
      request(`${process.env.NEXT_PUBLIC_HOST}/graphql`, countryListsQuery),
  });

  queryClient.prefetchQuery({
    queryKey: ["latest-country"],
    queryFn: async () =>
      request(`${process.env.NEXT_PUBLIC_HOST}/graphql`, latestCountryQuery),
  });

  return (
    <div className={styles.page}>
      <Link href={"/mutation"}>Mutation</Link>
      <main className={styles.main}>
        <div
          style={{
            textAlign: "center",
            margin: "1rem 0",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "50rem",
          }}
        >
          <h1 style={{ textAlign: "center" }}>ISR PAGE</h1>
          <p>revalidate once a request comes in (every 10 seconds)</p>
          <p>
            Once revalidated, page is going to be pre-rendered with the latest
            data{" "}
            <i>
              (Open the devtools, and in the Network tab, inspect the response
              for this document. You'll see that the page is pre-rendered with
              the latest data)
            </i>
          </p>
        </div>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense
            fallback={
              <h1 style={{ textAlign: "center", opacity: "0.5" }}>
                Fetching latest country...
              </h1>
            }
          >
            <LatestCountry />
          </Suspense>

          <Suspense
            fallback={
              <div
                style={{
                  padding: "1rem",
                  background: "#36ff732c",
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 auto",
                  width: "314px",
                  height: "1500px",
                  opacity: "0.5",
                  animation: "skeleton-loading 1.5s infinite ease-in-out",
                }}
              ></div>
            }
          >
            <CountryLists />
          </Suspense>
        </HydrationBoundary>

        {/* <Suspense fallback={"Loading..."}>
          <PreloadQuery query={countryListsQuery}>
            {({ data }) => <CountryLists initialData={data} />}
          </PreloadQuery>
        </Suspense> */}
      </main>
    </div>
  );
}
