"use client";

import { useState, useEffect } from "react";
import { BookOpen, Search, Clock } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import styles from "./livros.module.css";

export default function LivrosPage() {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [livrosResponse, autoresResponse] = await Promise.all([
        axios.get("http://localhost:5000/book"),
        axios.get("http://localhost:5000/author")
      ]);
      
      // Mapear livros com informações do autor
      const livrosComAutor = livrosResponse.data.map(livro => {
        const autor = autoresResponse.data.find(autor => autor.id === livro.authorId);
        return {
          ...livro,
          nomeAutor: autor ? autor.nome : 'Autor desconhecido'
        };
      });

      setLivros(livrosComAutor);
      setAutores(autoresResponse.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setError("Erro ao carregar livros. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Função para processar imageUrl
  const getImageUrl = (livro) => {
    if (!livro.imageUrl) return '/image/imgBanner.png';
    
    if (livro.imageUrl.startsWith('public/')) {
      return '/' + livro.imageUrl.substring(7);
    }
    
    return livro.imageUrl;
  };

  // Filtrar livros baseado na pesquisa
  const livrosFiltrados = livros.filter(livro =>
    livro.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livro.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livro.nomeAutor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando livros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <BookOpen className={styles.errorIcon} />
          <p>{error}</p>
          <button onClick={fetchData} className={styles.retryButton}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BookOpen className={styles.headerIcon} />
        <h1 className={styles.title}>Biblioteca de Livros</h1>
        <p className={styles.subtitle}>
          Explore nossa coleção de obras literárias brasileiras
        </p>
        
        {/* Barra de pesquisa */}
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Pesquisar livros ou autores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.resultsInfo}>
          <p>
            {livrosFiltrados.length} {livrosFiltrados.length === 1 ? 'livro encontrado' : 'livros encontrados'}
          </p>
        </div>

        <div className={styles.livrosGrid}>
          {livrosFiltrados.map((livro) => (
            <Link href={`/livros/${livro.id}`} key={livro.id} className={styles.livroCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={getImageUrl(livro)}
                  alt={livro.nome || livro.title}
                  className={styles.livroImage}
                  onError={(e) => {
                    e.target.src = '/image/imgBanner.png';
                  }}
                />
              </div>
              
              <div className={styles.livroInfo}>
                <h3 className={styles.livroTitulo}>
                  {livro.nome || livro.title}
                </h3>
                <p className={styles.livroAutor}>
                  por {livro.nomeAutor}
                </p>
                
                {livro.description && (
                  <p className={styles.livroDescricao}>
                    {livro.description.length > 150 
                      ? `${livro.description.substring(0, 150)}...` 
                      : livro.description}
                  </p>
                )}
                
                {(livro.year_publication || livro.publicationDate) && (
                  <div className={styles.livroData}>
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

        {livrosFiltrados.length === 0 && searchTerm && (
          <div className={styles.noResults}>
            <Search className={styles.noResultsIcon} />
            <h3>Nenhum livro encontrado</h3>
            <p>Tente pesquisar com outros termos</p>
          </div>
        )}
      </div>
    </div>
  );
}