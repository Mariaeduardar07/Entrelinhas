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

  // Funções simples de navegação
  const nextSlide = () => {
    const totalGroups = Math.ceil(autores.length / 3);
    setCurrentIndex(currentIndex === totalGroups - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    const totalGroups = Math.ceil(autores.length / 3);
    setCurrentIndex(currentIndex === 0 ? totalGroups - 1 : currentIndex - 1);
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
        </div>

        {/* Carrossel SUPER SIMPLES */}
        <div className={styles.carrosselContainer}>
          <button onClick={prevSlide} className={styles.navButton}>
            <ChevronLeft size={24} />
          </button>
          
          <div className={styles.carrossel}>
            <div 
              className={styles.carrosselTrack}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 0.3s ease'
              }}
            >
              {Array.from({ length: Math.ceil(autores.length / 3) }).map((_, groupIndex) => (
                <div key={groupIndex} className={styles.grupo}>
                  {autores.slice(groupIndex * 3, (groupIndex + 1) * 3).map((autor) => (
                    <div key={autor.id} className={styles.item}>
                      <AutorCard autor={autor} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <button onClick={nextSlide} className={styles.navButton}>
            <ChevronRight size={24} />
          </button>
        </div>


      </div>
    </section>
  );
}