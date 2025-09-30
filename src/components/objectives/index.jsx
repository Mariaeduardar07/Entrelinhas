import styles from "./objectives.module.css";

export default function Objectives() {
  const objectives = [
    {
      icon: "�",
      title: "Valorizar a Literatura Brasileira",
      description: "Valorizar a literatura brasileira e dar mais visibilidade aos autores nacionais."
    },
    {
      icon: "🔎",
      title: "Facilitar o Acesso",
      description: "Facilitar o acesso a informações sobre livros, personagens e períodos históricos."
    },
    {
      icon: "✨",
      title: "Incentivar a Leitura",
      description: "Incentivar a leitura com recomendações personalizadas e curiosidades literárias."
    },
    {
      icon: "⭐",
      title: "Lista de Favoritos",
      description: "Permitir que cada leitor crie sua lista de favoritos para futuras leituras."
    },
    {
      icon: "🌟",
      title: "Descoberta Inspiradora",
      description: "Tornar a descoberta da literatura nacional simples, interessante e inspiradora."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nossos Objetivos</h2>
        <div className={styles.grid}>
          {objectives.map((objective, index) => {
            // Centraliza os dois últimos cards na segunda linha
            let cardStyle = {};
            if (index === 3) cardStyle.gridColumn = "2 / 3";
            if (index === 4) cardStyle.gridColumn = "3 / 4";
            return (
              <div key={index} className={styles.card} style={cardStyle}>
                <div className={styles.icon}>{objective.icon}</div>
                <h3 className={styles.cardTitle}>{objective.title}</h3>
                <p className={styles.description}>{objective.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
