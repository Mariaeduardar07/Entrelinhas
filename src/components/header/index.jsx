"use client";


import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Image
            src="/image/logo.png"
            alt="Logo EntreLinhas"
            width={40}
            height={40}
            className={styles.logoImg}
          />
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
              <Link href="/autores" className={styles.navLink}>
                Autores
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/livros" className={styles.navLink}>
                Livros
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
