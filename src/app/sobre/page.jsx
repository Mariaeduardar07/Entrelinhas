import styles from "./sobre.module.css";
import Image from "next/image";

export default function Sobre() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>   
            <h1 className={styles.heroTitle}>
              Olá, eu sou <span className={styles.highlight}>Maria Eduarda</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Eu sou a Duda e gosto de ler, cozinhar, tomar açaí e sorvete. Adoro ler, cozinhar e ver series também adoro aprender e explorar o mundo da tecnologia.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2+</span>
                <span className={styles.statLabel}>Projetos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2 anos</span>
                <span className={styles.statLabel}>no curso de tecnologia</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Tecnologias</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.imageContainer}>
              <Image
                src="/image/duda.png"
                alt="Maria Eduarda"
                width={350}
                height={350}
                className={styles.profileImg}
              />
              <div className={styles.imageGlow}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
