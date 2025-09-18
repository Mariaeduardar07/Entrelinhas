import styles from "./heroSection.module.css";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Heart, Star, Sparkles, Quote } from "lucide-react";

export default function HeroSection() {
  return (
    <div className={styles.main}>
      {/* Elementos decorativos de fundo */}
      <div className={styles.backgroundElements}>
        <div className={styles.geometricShape1}></div>
        <div className={styles.geometricShape2}></div>
        <div className={styles.geometricShape3}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <Sparkles size={16} />
          <span>Descobrindo Grandes Autores</span>
        </div>
        
        <h1>
          <span className={styles.subtitle}>Bem-vindo ao</span>
          <span className={styles.highlight}>EntreLinhas</span>
          <div className={styles.titleDecoration}>
            <Quote className={styles.quoteIcon} />
          </div>
        </h1>
        
        <p className={styles.description}>
          Descubra o fascinante mundo da literatura através da nossa plataforma completa. 
          Explore biografias de grandes autores, conheça suas histórias e mergulhe no 
          universo literário. Uma experiência única para apaixonados por livros.
        </p>
        
        <div className={styles.ctaContainer}>
          <Link href="/autores" className={styles.ctaPrimary}>
            <BookOpen size={20} />
            <span>Explorar Autores</span>
            <div className={styles.buttonShine}></div>
          </Link>
          <Link href="/sobre" className={styles.ctaSecondary}>
            <Heart size={20} />
            <span>Sobre Mim</span>
          </Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>15+</div>
            <div className={styles.statLabel}>Autores</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100+</div>
            <div className={styles.statLabel}>Biografias</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Descobertas</div>
          </div>
        </div>
      </div>
      
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          {/* Círculos decorativos */}
          <div className={styles.decorativeCircles}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
          </div>

          <div className={styles.imageFrame}>
            <Image
              src="/image/minhsFoto.png"
              alt="Maria Eduarda - Desenvolvedora e Apaixonada por Literatura"
              width={400}
              height={400}
              className={styles.profileImage}
              priority
            />
            <div className={styles.imageGlow}></div>
          </div>

          <div className={styles.decorativeElements}>
            <div className={styles.floatingIcon}>
              <BookOpen size={24} />
            </div>
            <div className={styles.floatingIcon}>
              <Star size={24} />
            </div>
            <div className={styles.floatingIcon}>
              <Sparkles size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}