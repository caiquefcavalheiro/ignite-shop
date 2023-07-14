import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { Container } from "@/styles/pages/app";
import { CartContextProvider } from "../context/cartContext";
import { Cart } from "../components/cart";

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
        <CartContextProvider>
          <Cart />
          <Component {...pageProps} />
        </CartContextProvider>
      </Container>
    </main>
  );
}
