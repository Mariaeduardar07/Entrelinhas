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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando detalhes...</div>
      </div>
    );
  }

  if (!autor) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Autor não encontrado</div>
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
            {isValidImageUrl(autor.imageUrl) && !imageError ? (
              <Image
                src={autor.imageUrl}
                alt={autor.nome}
                width={400}
                height={300}
                className={styles.image}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
                onError={handleImageError}
              />
            ) : (
              <div
                className={styles.imagePlaceholder}
                style={{
                  width: "100%",
                  height: "300px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  fontSize: "18px",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "48px" }}>�</span>
                <span>Imagem não disponível</span>
              </div>
            )}
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.title}>{autor.nome}</h1>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Biografia:</span>
                <span className={styles.value}>
                  {autor.biography || "Biografia não disponível"}
                </span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.label}>Período Histórico:</span>
                <span className={styles.value}>
                  {autor.historical_period || "Período não disponível"}
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
                  {autor.curiosities || "Curiosidades não disponíveis"}
                </span>
              </div>

              {autor.books && autor.books.length > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Obras:</span>
                  <span className={styles.value}>
                    {autor.books.map(book => book.title).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}