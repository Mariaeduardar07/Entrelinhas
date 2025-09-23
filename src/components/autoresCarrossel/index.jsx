"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import axios from "axios";
import AutorCard from "@/components/autorCard";
import styles from "./autoresCarrossel.module.css";

export default function AutoresCarrossel() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carrosselRef = useRef(null);
  const intervalRef = useRef(null);

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

  const getVisibleCards = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    return 1;
  }, []);

  const [visibleCards, setVisibleCards] = useState(4);
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    try {
      setMounted(true);
      setIsClient(typeof window !== 'undefined');
    } catch (error) {
      console.warn('Erro na hidratação do componente:', error);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !isClient || typeof window === 'undefined') return;
    
    try {
      const handleResize = () => {
        if (typeof window !== 'undefined') {
          setVisibleCards(getVisibleCards());
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      
      return () => {
        try {
          if (typeof window !== 'undefined') {
            window.removeEventListener("resize", handleResize);
          }
        } catch (error) {
          console.warn('Erro ao remover event listener:', error);
        }
      };
    } catch (error) {
      console.warn('Erro ao configurar event listener de resize:', error);
    }
  }, [mounted, isClient, getVisibleCards]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || isPaused || autores.length === 0 || !mounted) return;

    try {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const maxIndex = Math.max(0, autores.length - visibleCards);
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 4000); // Muda a cada 4 segundos

      return () => {
        try {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        } catch (error) {
          console.warn('Erro ao limpar interval:', error);
        }
      };
    } catch (error) {
      console.warn('Erro no auto-play:', error);
    }
  }, [isAutoPlay, isPaused, autores.length, visibleCards, mounted]);

  const nextSlide = useCallback(() => {
    const maxIndex = Math.max(0, autores.length - visibleCards);
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  }, [autores.length, visibleCards]);

  const prevSlide = useCallback(() => {
    const maxIndex = Math.max(0, autores.length - visibleCards);
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  }, [autores.length, visibleCards]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Touch handlers para dispositivos móveis
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!mounted || !isClient || typeof window === 'undefined') return;

    try {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        } else if (e.key === ' ') {
          e.preventDefault();
          toggleAutoPlay();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        try {
          if (typeof window !== 'undefined') {
            window.removeEventListener('keydown', handleKeyDown);
          }
        } catch (error) {
          console.warn('Erro ao remover event listener de teclado:', error);
        }
      };
    } catch (error) {
      console.warn('Erro ao configurar event listener de teclado:', error);
    }
  }, [nextSlide, prevSlide, mounted, isClient]);

  // Cleanup final quando o componente desmonta
  useEffect(() => {
    return () => {
      try {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } catch (error) {
        console.warn('Erro no cleanup final:', error);
      }
    };
  }, []);

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
          <h2 className={styles.title}>Nossos Autores</h2>
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
            <p>Nenhum autor encontrado</p>
          </div>
        </div>
      </section>
    );
  }

  const totalSlides = Math.max(0, autores.length - visibleCards);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalSlides;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Explore os Autores</h2>
            <p className={styles.subtitle}>
              Descubra os grandes escritores e suas histórias fascinantes
            </p>
          </div>
          
          <div className={styles.controls}>
            <button
              className={styles.autoPlayButton}
              onClick={toggleAutoPlay}
              title={isAutoPlay ? "Pausar rotação automática" : "Iniciar rotação automática"}
            >
              {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>

        <div 
          className={styles.carrosselContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botão Anterior */}
          <button
            className={`${styles.navButton} ${styles.prevButton} ${!canGoPrev ? styles.disabled : ''}`}
            onClick={prevSlide}
            disabled={!canGoPrev}
            aria-label="Autor anterior"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carrossel */}
          <div className={styles.carrossel} ref={carrosselRef}>
            <div
              className={styles.carrosselTrack}
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                width: `${(autores.length / visibleCards) * 100}%`
              }}
            >
              {autores.map((autor, index) => (
                <div 
                  key={autor.id} 
                  className={`${styles.carrosselItem} ${
                    index >= currentIndex && index < currentIndex + visibleCards 
                      ? styles.active 
                      : ''
                  }`}
                >
                  <AutorCard autor={autor} />
                </div>
              ))}
            </div>
          </div>

          {/* Botão Próximo */}
          <button
            className={`${styles.navButton} ${styles.nextButton} ${!canGoNext ? styles.disabled : ''}`}
            onClick={nextSlide}
            disabled={!canGoNext}
            aria-label="Próximo autor"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}