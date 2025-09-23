import Link from "next/link";
import styles from "./autorCard.module.css";

export default function AutorCard({ autor }) {
  const fallbackImage = "/image/imgBanner.png";
  
  // Processa a imageUrl do backend
  const getImageUrl = (autor) => {
    if (!autor.imageUrl) return fallbackImage;
    
    // Se a imageUrl começa com 'public/', remove essa parte
    if (autor.imageUrl.startsWith('public/')) {
      return '/' + autor.imageUrl.substring(7); // Remove 'public/' e adiciona '/'
    }
    
    // Se já é uma URL completa ou caminho absoluto, usa como está
    return autor.imageUrl;
  };

  return (
    <Link href={`/autores/${autor.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={getImageUrl(autor)}
          alt={autor.nome}
          className={styles.image}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{autor.nome}</h3>
      </div>
    </Link>
  );
}