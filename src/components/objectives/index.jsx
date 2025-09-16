import styles from "./objectives.module.css";

export default function Objectives() {
  const objectives = [
    {
      icon: "📚",
      title: "Valorizar Autores",
      description: "Destacar a vida e obra de grandes escritores, preservando suas contribuições para a literatura mundial."
    },
    {
      icon: "🎓",
      title: "Educação Literária", 
      description: "Proporcionar uma experiência educativa e interativa para estudantes e amantes da literatura."
    },
    {
      icon: "🌍",
      title: "Contexto Histórico",
      description: "Conectar obras literárias com seus períodos históricos, oferecendo uma visão ampla da evolução cultural."
    },
    {
      icon: "💡",
      title: "Descobertas",
      description: "Revelar curiosidades e fatos interessantes sobre autores e suas obras que você talvez não conhecia."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nossos Objetivos</h2>
        <div className={styles.grid}>
          {objectives.map((objective, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{objective.icon}</div>
              <h3 className={styles.cardTitle}>{objective.title}</h3>
              <p className={styles.description}>{objective.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
