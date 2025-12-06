import Banner from "@/components/Banner/Banner";
import Services from "@/components/Services/Services";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Banner />      
        <Services /> 
      </main>      
    </div>
  );
}
