import Banner from "@/components/Banner/Banner";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Banner />       
      </main>      
    </div>
  );
}
