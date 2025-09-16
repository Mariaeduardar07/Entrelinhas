import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/bannerHome";
import Objectives from "@/components/objectives";

export default function Home() {
  return (
    <div className={styles.container}>
      <Banner
        title="Bem-vindo ao Entrelinhas"
        description="Uma plataforma dedicada à valorização de autores e suas obras literárias. Aqui você pode explorar biografias, descobrir curiosidades fascinantes e mergulhar no universo dos grandes escritores da história."
        button="EXPLORAR AGORA"
        image="/image/imgBanner.png"
        imageAlt="Livro aberto"
      />
      <Objectives />
    </div>
  );
}
