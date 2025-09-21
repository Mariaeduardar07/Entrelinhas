"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { BookOpen, Clock, Lightbulb } from "lucide-react"; // Ícones para autores
import styles from "./detalhes.module.css";

export default function DetalhesAutor() {
  const [autor, setAutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/author/${params.id}`
        );
        setAutor(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      buscarDetalhes();
    }
  }, [params.id]);

  // Função para obter a imagem local do autor
  const getAuthorImage = (autor) => {
    // Mapeamento manual para garantir que funcione
    const imageMap = {
      'Carlos Drummond de Andrade': '/image/carlosDrummond.png',
      'Cecília Meireles': '/image/ceciliaMeireles.png',
      'Clarice Lispector': '/image/clariceLispector.png',
      'Graciliano Ramos': '/image/gracilianoRamos.png',
      'Jorge Amado': '/image/jorgeAmado.png',
      'José de Alencar': '/image/joseDeAlencar.png',
      'Lima Barreto': '/image/limaBarreto.png',
      'Machado de Assis': '/image/machadoDeAssis.png',
      'Manuel Bandeira': '/image/manuelBandeira.png'
    };

    return imageMap[autor.nome] || '/image/imgBanner.png';
  };

  // Função para verificar se uma URL de imagem é válida
  const isValidImageUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Função para tratar erros de imagem
  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback para imagem padrão
  const fallbackImage = "/icons/favicon.ico";

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <span className={styles.spinner}></span>
          Carregando detalhes...
        </div>
      </div>
    );
  }

  if (!autor) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <span className={styles.errorIcon}>😢</span>
          Autor não encontrado
        </div>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Voltar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Voltar para Autores
        </button>

        <div className={styles.detailsCard}>
          <div className={styles.imageSection}>
            <img
              src={getAuthorImage(autor)}
              alt={autor.nome}
              className={styles.image}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "24px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.18)",
                transition: "transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)",
              }}
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            />
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.title}>
              {autor.nome || <span className={styles.value}>Nome não disponível</span>}
            </h1>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Biografia:</span>
                <span className={styles.value}>
                  {autor.biography ? autor.biography : <span className={styles.placeholder}>Biografia não disponível</span>}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Período Histórico:</span>
                <span className={styles.value}>
                  {autor.historical_period ? autor.historical_period : <span className={styles.placeholder}>Período não disponível</span>}
                </span>
              </div> 

              <div className={styles.cardMeta}>
                {autor.historical_period && (
                  <span className={styles.badge}>
                    <Clock size={12} />
                    {autor.historical_period}
                  </span>
                )}

                {autor.books && autor.books.length > 0 && (
                  <span className={styles.badge}>
                    <BookOpen size={12} />
                    {autor.books.length} {autor.books.length === 1 ? 'livro' : 'livros'}
                  </span>
                )}

                {autor.curiosities && (
                  <span className={styles.badge}>
                    <Lightbulb size={12} />
                    Curiosidades
                  </span>
                )}
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Curiosidades:</span>
                <span className={styles.value}>
                  {autor.curiosities ? autor.curiosities : <span className={styles.placeholder}>Curiosidades não disponíveis</span>}
                </span>
              </div>

              {autor.books && autor.books.length > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Obras Principais:</span>
                  <div className={styles.booksList}>
                    {autor.books.map((book, index) => (
                      <div key={index} className={styles.bookItem}>
                        <BookOpen size={16} />
                        <span>{book.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}