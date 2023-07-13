import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import logoImg from "../assets/logo.svg";
import {
  CartContainer,
  CartList,
  CartMain,
  CartProduct,
  CartProductInfo,
  CartResume,
  Container,
  Header,
  HeaderIcon,
} from "@/styles/pages/app";
import Image from "next/image";
import { Handbag, X } from "@phosphor-icons/react";
import { useState } from "react";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

//colocar fora do myApp para renderizar somente um unica vez.
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const products = [1, 2, 3];
  const [cartState, setCartState] = useState(false);

  function handleChangeCartState() {
    setCartState((state) => !state);
  }

  return (
    <main className={roboto.className}>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <HeaderIcon onClick={handleChangeCartState}>
            <Handbag size={24} />
            {products.length && <span>{products.length}</span>}
          </HeaderIcon>
        </Header>
        {cartState && (
          <CartMain>
            <CartContainer>
              <button onClick={handleChangeCartState}>
                <X size={24} />
              </button>
              <h3>Sacola de compras</h3>
              <CartList>
                <CartProduct>
                  <Image src={logoImg} alt="" />
                  <CartProductInfo>
                    <p>Camiseta Beyond the Limits</p>
                    <strong>R$ 79,90</strong>
                    <button>Remover</button>
                  </CartProductInfo>
                </CartProduct>
              </CartList>
            </CartContainer>
            <CartResume>
              <div>
                <p>Quantidade</p>
                <p>3 itens</p>
              </div>
              <div>
                <strong>Valor total</strong>
                <strong>R$ 270,00</strong>
              </div>
              <button>Finalizar Compra</button>
            </CartResume>
          </CartMain>
        )}
        <Component {...pageProps} />
      </Container>
    </main>
  );
}
