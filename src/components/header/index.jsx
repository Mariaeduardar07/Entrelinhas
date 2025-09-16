"use client";

import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <h1 className={styles.title}>EntreLinhas</h1>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/listagem" className={styles.navLink}>
                Autores
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/sobre" className={styles.navLink}>
                Sobre Mim
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/favoritos" className={styles.navLink}>
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
