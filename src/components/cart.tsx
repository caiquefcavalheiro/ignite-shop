import {
  CartContainer,
  CartList,
  CartMain,
  CartProduct,
  CartProductInfo,
  CartResume,
  Header,
  HeaderIcon,
} from "@/styles/pages/app";
import { Handbag, X } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import Image from "next/image";
import logoImg from "../assets/logo.svg";
import axios from "axios";
import Link from "next/link";

export function Cart() {
  const [cartState, setCartState] = useState(false);
  const { cart, removeFromCart, cleanCart } = useContext(CartContext);

  function handleChangeCartState() {
    setCartState((state) => !state);
  }

  const cartPrice = cart.reduce((acc, product) => (acc += product.price), 0);

  const cartPriceBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartPrice);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      if (cart.length > 0) {
        const response = await axios.post("/api/checkoutCart", {
          cart,
        });

        const { checkoutUrl } = response.data;

        window.location.href = checkoutUrl;
      }
      setIsCreatingCheckoutSession(false);
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  function handleRemove(id: string) {
    removeFromCart(id);
  }

  return (
    <>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>
        <HeaderIcon onClick={handleChangeCartState}>
          <Handbag size={24} />
          {cart.length > 0 && <span>{cart.length}</span>}
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
              {cart.map((product) => {
                const productPrice = new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price);

                return (
                  <CartProduct key={product.id}>
                    <Image
                      src={product.imageUrl}
                      width={96}
                      height={96}
                      alt=""
                    />
                    <CartProductInfo>
                      <p>{product.name}</p>
                      <strong>{productPrice}</strong>
                      <button onClick={() => handleRemove(product.id)}>
                        Remover
                      </button>
                    </CartProductInfo>
                  </CartProduct>
                );
              })}
            </CartList>
          </CartContainer>
          <CartResume>
            <div>
              <p>Quantidade</p>
              <p>{cart.length} itens</p>
            </div>
            <div>
              <strong>Valor total</strong>
              <strong>{cartPriceBRL}</strong>
            </div>
            <button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}>
              Finalizar Compra
            </button>
          </CartResume>
        </CartMain>
      )}
    </>
  );
}
