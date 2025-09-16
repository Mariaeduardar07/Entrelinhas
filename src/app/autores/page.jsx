"use client";

import { useState, useEffect } from "react";
import { Spin, Pagination } from "antd";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ArrowRight, BookOpen, Clock, Lightbulb } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import styles from "./autores.module.css";

export default function AutoresPage() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [imageErrors, setImageErrors] = useState(new Set());

  // Função para buscar todos os autores
  const fetchAutores = async () => {
    try {
      const response = await axios.get("http://localhost:5000/author");
      setAutores(response.data);
      toast.success("Autores carregados com sucesso!", {
        toastId: "success-load", // ID único para evitar duplicatas
      });
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
      toast.error("Erro ao carregar autores.", {
        toastId: "error-load",
      });
    } finally {
      setLoading(false);
    }
  };

  // Executa a busca quando o componente carrega
  useEffect(() => {
    fetchAutores();
  }, []);

  // Calcula quais autores mostrar na página atual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentAutores = autores.slice(startIndex, endIndex);

  // Função para mudar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Função para mudar quantidade de itens por página
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Função para tratar erros de imagem
  const handleImageError = (autorId) => {
    setImageErrors(prev => new Set([...prev, autorId]));
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Descubra o Mundo dos Autores</h1>
        <p className={styles.subtitle}>
          Explore nossa coleção completa de autores com informações detalhadas, 
          biografias e curiosidades sobre cada escritor.
        </p>
      </div>

      {loading ? (
        <div className={styles.loadingWrapper}>
          <Spin size="large" />
          <p className={styles.loadingText}>Carregando autores...</p>
        </div>
      ) : (
        <>
          <div className={styles.controlsWrapper}>
            <Pagination
              total={autores.length}
              showTotal={(total) => `${total} autores encontrados`}
              pageSize={pageSize}
              current={currentPage}
              showSizeChanger={true}
              pageSizeOptions={["6", "12", "18", "24"]}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
            />
          </div>

          <div className={styles.cardsContainer}>
            {currentAutores.map((autor) => (
              <Link
                key={autor.id}
                href={`/autores/${autor.id}`}
                className={styles.cardLink}
              >
                <div className={styles.userCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.imageSection}>
                      {isValidImageUrl(autor.imageUrl) && !imageErrors.has(autor.id) ? (
                        <Image
                          src={autor.imageUrl}
                          alt={autor.nome}
                          fill
                          className={styles.cardImage}
                          onError={() => handleImageError(autor.id)}
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <div className={styles.icon}>📚</div>
                          <span>Imagem não disponível</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className={styles.userName}>{autor.nome}</h3>
                    
                
                    
                    <button className={styles.viewButton}>
                      Ver Detalhes
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}