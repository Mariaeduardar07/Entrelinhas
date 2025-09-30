
import Image from "next/image";
import styles from "./objectives.module.css";

export default function Objectives() {
  const objectives = [
    {
      img: "/image/obj1.png",
      title: "Valorizar a Literatura Brasileira",
      description: "Valorizar a literatura brasileira e dar mais visibilidade aos autores nacionais."
    },
    {
      img: "/image/obj2.png",
      title: "Facilitar o Acesso",
      description: "Facilitar o acesso a informações sobre livros, personagens e períodos históricos."
    },
    {
      img: "/image/obj3.png",
      title: "Incentivar a Leitura",
      description: "Incentivar a leitura com recomendações personalizadas e curiosidades literárias."
    },
    {
      img: "/image/obj4.png",
      title: "Lista de Favoritos",
      description: "Permitir que cada leitor crie sua lista de favoritos para futuras leituras."
    },
    {
      img: "/image/obj5.png",
      title: "Descoberta Inspiradora",
      description: "Tornar a descoberta da literatura nacional simples, interessante e inspiradora."
    },
    {
      img: "/image/obj5.png",
      title: "Fortalecer a Cultura Brasileira",
      description: "Contribuir para o fortalecimento da cultura e identidade literária brasileira."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
  <h2 className={styles.title}>Por que o EntreLinhas existe?</h2>
        <div className={styles.grid}>
          {objectives.map((objective, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>
                <Image src={objective.img} alt={objective.title} width={56} height={56} />
              </div>
              <h3 className={styles.cardTitle}>{objective.title}</h3>
              <p className={styles.description}>{objective.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
