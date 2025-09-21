"use client";

import { useState, useEffect } from "react";
import { Spin, Pagination } from "antd";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./autores.module.css";

export default function AutoresPage() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const fetchAutores = async () => {
    try {
      const response = await axios.get("http://localhost:5000/author");
      setAutores(response.data);
      toast.success("Autores carregados!");
    } catch (error) {
      toast.error("Erro ao carregar autores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentAutores = autores.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getAuthorImage = (autor) => {
    const imageMap = {
      'Machado de Assis': '/image/machadoDeAssis.png',
      'José de Alencar': '/image/joseDeAlencar.png', 
      'Graciliano Ramos': '/image/gracilianoRamos.png',
      'Jorge Amado': '/image/jorgeAmado.png',
      'Clarice Lispector': '/image/clariceLispector.png',
      'Manuel Bandeira': '/image/manuelBandeira.png',
      'Carlos Drummond de Andrade': '/image/carlosDrummond.png',
      'Cecília Meireles': '/image/ceciliaMeireles.png',
      'Lima Barreto': '/image/limaBarreto.png'
    };
    
    return imageMap[autor.nome] || '/image/imgBanner.png';
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
                <article className={styles.autorCard}>
                  <div className={styles.cardBackground}></div>
                  
                  <div className={styles.imageWrapper}>
                    <div className={styles.imageFrame}>
                      <img
                        src={getAuthorImage(autor)}
                        alt={autor.nome}
                        className={styles.autorImage}
                        onError={(e) => {
                          e.target.src = '/image/imgBanner.png';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h3 className={styles.autorNome}>{autor.nome}</h3>
                    <div className={styles.readMore}>
                      <span>Explorar biografia</span>
                      <div className={styles.arrow}>→</div>
                    </div>
                  </div>
                  
                  <div className={styles.decorativeElements}>
                    <div className={styles.topQuote}>"</div>
                    <div className={styles.bottomQuote}>"</div>
                  </div>
                </article>
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