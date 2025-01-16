import Image from "next/image";
import styles from "./page.module.css";
import CountryLists from "./components/country-lists";
import PreloadQuery from "./lib/preload-query";
import Link from "next/link";
import { countryListsQuery } from "./lib/queries";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Home() {
  return (
    <div className={styles.page}>
      <Link href={"/about"}>About</Link>
      <main className={styles.main}>
        <h1>Hello world</h1>
        <Suspense fallback={"Loading..."}>
          <PreloadQuery query={countryListsQuery}>
            {({ data }) => <CountryLists initialData={data} />}
          </PreloadQuery>
        </Suspense>
      </main>
    </div>
  );
}
