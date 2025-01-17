import styles from "../page.module.css";
import CountryLists from "../components/country-lists";
import Link from "next/link";
import MutateCountry from "../components/mutate-country";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";
export const revalidate = 30;

export default async function ClientSide() {
  return (
    <div className={styles.page}>
      <Link href={"/"}>Home</Link>
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
          <h1>Mutate the list</h1>
        </div>
        <MutateCountry />
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
      </main>
    </div>
  );
}
