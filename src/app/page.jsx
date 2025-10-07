"use client";

import { useState, useEffect } from "react";
import { BookOpen, Users, Heart } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import styles from "./page.module.css";
import Banner from "@/components/bannerHome";
import Objectives from "@/components/objectives";
import AutoresCarrossel from "@/components/autoresCarrossel";

export default function Home() {
  const [stats, setStats] = useState({
    autores: 0,
    livros: 0,
    favoritos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [autoresResponse, livrosResponse] = await Promise.all([
        axios.get("http://localhost:5000/author"),
        axios.get("http://localhost:5000/book")
      ]);

      // Calcular estatísticas
      const totalAutores = autoresResponse.data.length;
      const totalLivros = livrosResponse.data.length;
      const autoresFavoritos = JSON.parse(localStorage.getItem('autoresFavoritos') || '[]');
      const livrosFavoritos = JSON.parse(localStorage.getItem('livrosFavoritos') || '[]');
      const totalFavoritos = autoresFavoritos.length + livrosFavoritos.length;

      setStats({
        autores: totalAutores,
        livros: totalLivros,
        favoritos: totalFavoritos
      });


    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={styles.container}>
      <Banner
        title="Bem-vindo ao Entrelinhas"
        description="Uma plataforma dedicada à valorização de autores e suas obras literárias. Aqui você pode explorar biografias, descobrir curiosidades fascinantes e mergulhar no universo dos grandes escritores da história."
        button="EXPLORAR AGORA"
        image="/image/imgBanner.png"
        imageAlt="Livro aberto"
      />

      <Objectives />

      <AutoresCarrossel />



       {/* Seção de Estatísticas */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <Users className={styles.statIcon} />
            <div className={styles.statInfo}>
              <h3 className={styles.statNumber}>{stats.autores}</h3>
              <p className={styles.statLabel}>Autores</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <BookOpen className={styles.statIcon} />
            <div className={styles.statInfo}>
              <h3 className={styles.statNumber}>{stats.livros}</h3>
              <p className={styles.statLabel}>Livros</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <Heart className={styles.statIcon} />
            <div className={styles.statInfo}>
              <h3 className={styles.statNumber}>{stats.favoritos}</h3>
              <p className={styles.statLabel}>Favoritos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Explore o Universo Literário</h2>
            <p className={styles.ctaDescription}>
              Descubra biografias fascinantes, explore obras marcantes e conecte-se 
              com o rico patrimônio da literatura brasileira.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/autores" className={styles.ctaButtonPrimary}>
                <Users size={20} />
                Conhecer Autores
              </Link>
              <Link href="/sobre" className={styles.ctaButtonSecondary}>
                <BookOpen size={20} />
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
