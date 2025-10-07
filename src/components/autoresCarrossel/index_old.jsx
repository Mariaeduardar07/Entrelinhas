"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import AutorCard from "@/components/autorCard";
import styles from "./autoresCarrossel.module.css";

export default function AutoresCarrossel() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get("http://localhost:5000/author", {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log("Dados da API:", response.data);
        console.log("Total de autores recebidos:", response.data?.length);
        setAutores(response.data || []);
      } catch (err) {
        console.error("Erro detalhado ao buscar autores:", err);
        
        if (err.code === 'ECONNREFUSED') {
          setError("Servidor não está rodando. Verifique se a API está ativa na porta 5000.");
        } else if (err.response) {
          setError(`Erro do servidor: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          setError("Não foi possível conectar com o servidor. Verifique sua conexão.");
        } else {
          setError("Erro inesperado ao carregar autores.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAutores();
  }, []);

  // Detectar tamanho da tela e ajustar items por página
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window === 'undefined') return;
      
      if (window.innerWidth <= 768) {
        setItemsPerPage(1); // Mobile: 1 item por página
      } else if (window.innerWidth <= 1024) {
        setItemsPerPage(2); // Tablet: 2 itens por página
      } else {
        setItemsPerPage(3); // Desktop/Notebook: 3 itens por página
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Funções de navegação
  const totalPages = Math.ceil(autores.length / itemsPerPage);
  
  // Garantir que currentIndex não seja maior que totalPages
  useEffect(() => {
    if (currentIndex >= totalPages && totalPages > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalPages]);


  
  const nextSlide = () => {
    setCurrentIndex(prev => prev === totalPages - 1 ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => prev === 0 ? totalPages - 1 : prev - 1);
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Explore os autores</h2>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando autores...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Explore os autores</h2>
          <div className={styles.error}>
            <p>{error}</p>
            <button 
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (autores.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Nossos Autores</h2>
          <div className={styles.empty}>
            <p>Nenhum autor encontrado no servidor</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Explore os Autores</h2>
          <p className={styles.subtitle}>
            Descubra biografias fascinantes e obras marcantes dos grandes escritores
          </p>
        </div>

        <div className={styles.carrosselWrapper}>
          <button 
            onClick={prevSlide} 
            className={styles.navButton}
            disabled={totalPages <= 1}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className={styles.carrosselContainer}>
            <div 
              className={styles.carrosselTrack}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${totalPages * 100}%`,
                display: 'flex'
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div 
                  key={pageIndex} 
                  className={styles.carrosselPage}
                  style={{
                    display: 'flex',
                    width: '100%',
                    gap: '1rem',
                    flexShrink: 0,
                    justifyContent: 'center',
                    alignItems: 'stretch'
                  }}
                >
                  {autores
                    .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                    .map((autor) => (
                      <div key={autor.id} className={styles.carrosselItem}>
                        <AutorCard autor={autor} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={nextSlide} 
            className={styles.navButton}
            disabled={totalPages <= 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicadores */}
        {totalPages > 1 && (
          <div className={styles.indicators}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Info */}
        <div className={styles.info}>
          <p>Mostrando {Math.min((currentIndex + 1) * itemsPerPage, autores.length)} de {autores.length} autores</p>
        </div>
      </div>
    </section>
  );
}