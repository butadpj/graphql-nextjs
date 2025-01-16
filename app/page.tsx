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

// export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default async function Home() {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["countries"],
  //   queryFn: async () =>
  //     request(`${process.env.NEXT_PUBLIC_HOST}/api/graphql`, countryListsQuery),
  // });

  return (
    <div className={styles.page}>
      <Link href={"/about"}>About</Link>
      <main className={styles.main}>
        <h1>Hello world</h1>
        {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
        {/* <CountryLists /> */}
        {/* </HydrationBoundary> */}
        {/* <Suspense fallback={"Loading..."}> */}
        <PreloadQuery query={countryListsQuery}>
          {({ data }) => <CountryLists initialData={data} />}
        </PreloadQuery>
        {/* </Suspense> */}
      </main>
    </div>
  );
}
