import "./globals.css";

export const metadata = {
    title: "Entrelinhas",
    description: "Projeto de uma plataforma dedicada à valorização de autores e suas obras, oferecendo uma experiência interativa e educativa para os usuários.",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
