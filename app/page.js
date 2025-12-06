import Banner from "@/components/Banner/Banner";
import Services from "@/components/Services/Services";
import styles from "./page.module.css";

export const metadata = {
  title: "Nettoyage Perpignan",
  description: "Votre professionnel du nettoyage à Perpignan",
};

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
