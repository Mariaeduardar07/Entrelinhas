"use client";

import { useState, useEffect } from "react";
import { BookOpen, Users, Heart, TrendingUp, ArrowRight, Star, Clock } from "lucide-react";
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
  const [featuredBooks, setFeaturedBooks] = useState([]);
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

      // Pegar livros em destaque (primeiros 3)
      const livrosComAutor = livrosResponse.data.slice(0, 3).map(livro => {
        const autor = autoresResponse.data.find(a => a.id === livro.authorId);
        return {
          ...livro,
          nomeAutor: autor ? autor.nome : 'Autor desconhecido'
        };
      });

      setFeaturedBooks(livrosComAutor);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (item) => {
    if (!item?.imageUrl) return '/image/imgBanner.png';
    
    if (item.imageUrl.startsWith('public/')) {
      return '/' + item.imageUrl.substring(7);
    }
    
    return item.imageUrl;
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

      <Objectives />

      {/* Seção de Livros em Destaque */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Livros em Destaque</h2>
          <p className={styles.sectionSubtitle}>
            Descubra algumas das obras mais marcantes da literatura brasileira
          </p>
        </div>

        {loading ? (
          <div className={styles.loadingGrid}>
            {[1, 2, 3].map(i => (
              <div key={i} className={styles.skeletonCard}></div>
            ))}
          </div>
        ) : (
          <div className={styles.featuredGrid}>
            {featuredBooks.map((livro) => (
              <Link 
                href={`/livros/${livro.id}`} 
                key={livro.id} 
                className={styles.featuredCard}
              >
                <div className={styles.cardImage}>
                  <img
                    src={getImageUrl(livro)}
                    alt={livro.nome || livro.title}
                    onError={(e) => {
                      e.target.src = '/image/imgBanner.png';
                    }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {livro.nome || livro.title}
                  </h3>
                  <p className={styles.cardAuthor}>
                    por {livro.nomeAutor}
                  </p>
                  {livro.description && (
                    <p className={styles.cardDescription}>
                      {livro.description.length > 100 
                        ? `${livro.description.substring(0, 100)}...` 
                        : livro.description}
                    </p>
                  )}
                  {(livro.year_publication || livro.publicationDate) && (
                    <div className={styles.cardYear}>
                      <Clock size={14} />
                      <span>
                        {livro.year_publication || new Date(livro.publicationDate).getFullYear()}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className={styles.sectionFooter}>
          <Link href="/livros" className={styles.viewAllButton}>
            Ver Todos os Livros
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <AutoresCarrossel />

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
              <Link href="/livros" className={styles.ctaButtonSecondary}>
                <BookOpen size={20} />
                Explorar Livros
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
