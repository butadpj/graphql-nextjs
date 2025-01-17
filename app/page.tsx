import Image from "next/image";
import styles from "./page.module.css";
import CountryLists from "./components/country-lists";
import PreloadQuery from "./lib/preload-query";
import Link from "next/link";
import { countryListsQuery } from "./lib/queries";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import LatestCountry from "./components/latest-country";

// export const dynamic = "force-dynamic";
export const revalidate = 10;

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["countries"],
    queryFn: async () =>
      request(`${process.env.NEXT_PUBLIC_HOST}/api/graphql`, countryListsQuery),
  });

  return (
    <div className={styles.page}>
      <Link href={"/client-side"}>Client-side</Link>
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

        <Suspense
          fallback={
            <h1 style={{ textAlign: "center", opacity: "0.5" }}>
              Fetching latest country...
            </h1>
          }
        >
          <LatestCountry />
        </Suspense>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <CountryLists />
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
