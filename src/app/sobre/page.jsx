import styles from "./sobre.module.css";
import { Code, BookOpen, Heart, ExternalLink, Github, Award, Zap, Coffee, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SobrePage() {
  const projetos = [
    {
      id: 1,
      titulo: "EntreLinhas",
      descricao: "Plataforma interativa para descobrir grandes autores da literatura brasileira com design moderno e experiência imersiva.",
      tecnologias: ["Next.js", "React", "CSS Modules"],
      link: "#",
      github: "#",
      destaque: true
    },
    {
      id: 2,
      titulo: "Dashboard Analytics",
      descricao: "Sistema completo de análise de dados com gráficos interativos e relatórios em tempo real.",
      tecnologias: ["React", "Node.js", "PostgreSQL"],
      link: "#",
      github: "#",
      destaque: false
    },
    {
      id: 3,
      titulo: "E-commerce Books",
      descricao: "Marketplace especializado em livros com sistema de recomendações inteligentes.",
      tecnologias: ["Vue.js", "Firebase", "TypeScript"],
      link: "#",
      github: "#",
      destaque: false
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section Personalizada */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <Sparkles size={16} />
              <span>Desenvolvedora Full Stack</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Olá, eu sou <span className={styles.highlight}>Maria Eduarda</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Transformo ideias em código e código em experiências incríveis. 
              Apaixonada por desenvolvimento web e literatura, criando pontes 
              entre tecnologia e arte.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Projetos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2+</span>
                <span className={styles.statLabel}>Anos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Tecnologias</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.imageContainer}>
              <Image
                src="/image/duda.png"
                alt="Maria Eduarda"
                width={350}
                height={350}
                className={styles.profileImg}
              />
              <div className={styles.imageGlow}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Skills */}
      <section className={styles.skillsSection}>
        <div className={styles.skillsContainer}>
          <h2 className={styles.sectionTitle}>Tecnologias & Ferramentas</h2>
          
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <div className={styles.categoryIcon}>
                <Code size={24} />
              </div>
              <h3>Frontend</h3>
              <div className={styles.skillTags}>
                <span>React</span>
                <span>Next.js</span>
                <span>Vue.js</span>
                <span>TypeScript</span>
                <span>CSS3</span>
              </div>
            </div>

            <div className={styles.skillCategory}>
              <div className={styles.categoryIcon}>
                <Zap size={24} />
              </div>
              <h3>Backend</h3>
              <div className={styles.skillTags}>
                <span>Node.js</span>
                <span>Python</span>
                <span>Express</span>
                <span>Django</span>
                <span>APIs</span>
              </div>
            </div>

            <div className={styles.skillCategory}>
              <div className={styles.categoryIcon}>
                <Award size={24} />
              </div>
              <h3>Ferramentas</h3>
              <div className={styles.skillTags}>
                <span>Git</span>
                <span>Figma</span>
                <span>AWS</span>
                <span>Docker</span>
                <span>Scrum</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Projetos */}
      <section className={styles.projectsSection}>
        <div className={styles.projectsContainer}>
          <h2 className={styles.sectionTitle}>Projetos em Destaque</h2>
          
          <div className={styles.projectsGrid}>
            {projetos.map((projeto) => (
              <div key={projeto.id} className={`${styles.projectCard} ${projeto.destaque ? styles.featured : ''}`}>
                {projeto.destaque && (
                  <div className={styles.featuredBadge}>
                    <Award size={16} />
                    <span>Destaque</span>
                  </div>
                )}
                
                <div className={styles.projectHeader}>
                  <h3>{projeto.titulo}</h3>
                  <div className={styles.projectLinks}>
                    <Link href={projeto.link} className={styles.linkIcon}>
                      <ExternalLink size={18} />
                    </Link>
                    <Link href={projeto.github} className={styles.linkIcon}>
                      <Github size={18} />
                    </Link>
                  </div>
                </div>
                
                <p className={styles.projectDesc}>{projeto.descricao}</p>
                
                <div className={styles.techStack}>
                  {projeto.tecnologias.map((tech, index) => (
                    <span key={index} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Pessoal */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>Sobre Mim</h2>
              
              <p>
                Sou uma desenvolvedora apaixonada por criar soluções digitais que fazem a diferença. 
                Minha jornada começou com a curiosidade de entender como as coisas funcionam, 
                e hoje transformo essa curiosidade em código que impacta pessoas.
              </p>
              
              <div className={styles.interests}>
                <div className={styles.interest}>
                  <Code size={20} />
                  <span>Desenvolvimento Full Stack</span>
                </div>
                <div className={styles.interest}>
                  <BookOpen size={20} />
                  <span>Literatura & Escrita</span>
                </div>
                <div className={styles.interest}>
                  <Coffee size={20} />
                  <span>Café & Código</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
