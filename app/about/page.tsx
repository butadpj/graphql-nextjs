import styles from "../page.module.css";
import CountryLists from "../components/country-lists";
import Link from "next/link";
import MutateCountry from "../components/mutate-country";

export default async function About() {
  return (
    <div className={styles.page}>
      <Link href={"/"}>Home</Link>
      <main className={styles.main}>
        <h1>ABOUT</h1>
        <CountryLists />
        <MutateCountry />
      </main>
    </div>
  );
}
