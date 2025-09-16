import styles from "./bannerHome.module.css";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Banner({
  title,
  description,
  button,
  image,
  imageAlt,
}) {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
            <button className={styles.button}>
              {button} 
              <ChevronRight size={16} strokeWidth={2} />
            </button>
        </div> 
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={imageAlt}
          width={600}
          height={400}
          className={styles.image}
        />
      </div>
    </div>
  );
}