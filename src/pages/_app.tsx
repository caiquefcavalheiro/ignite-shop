import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "@/styles/pages/app";
import Image from "next/image";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

//colocar fora do myApp para renderizar somente um unica vez.
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
        </Header>
        <Component {...pageProps} />
      </Container>
    </main>
  );
}
