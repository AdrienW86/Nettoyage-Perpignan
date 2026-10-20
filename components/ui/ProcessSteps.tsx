import type { ProcessStep } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./processSteps.module.css";

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol role="list" className={styles.steps} style={{ ["--count" as string]: steps.length }}>
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 0.08} className={styles.step}>
          <span className={styles.num} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.text}>{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
