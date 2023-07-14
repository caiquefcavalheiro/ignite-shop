import { CartContext } from "@/src/context/cartContext";
import { stripe } from "@/src/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  //estado de loading para fazer a página de skeleton
  // const { isFallback } = useRouter();
  // direcionamento quando for rota interna
  // const router = useRouter()
  // router.push("/checkout")

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const findProduct = cart.find(
    (cartProduct) => cartProduct.id === product.defaultPriceId
  );

  async function handleBuyProduct() {
    try {
      addToCart({
        id: product.defaultPriceId,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
      });
    } catch (err) {
      setIsCreatingCheckoutSession(false);
    }
  }

  function handleRemoveProduct() {
    try {
      removeFromCart(product.defaultPriceId);
    } catch (err) {}
  }

  const productPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={420} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{productPrice}</span>
          <p>{product.description}</p>
          {findProduct ? (
            <button
              disabled={isCreatingCheckoutSession}
              onClick={handleRemoveProduct}>
              Remover da sacola
            </button>
          ) : (
            <button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}>
              Colocar na sacola
            </button>
          )}
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  //Deixar nos params sempre os produtos mais buscados da aplicação
  //Para que ele possa gerar eles de forma estática

  return {
    paths: [
      {
        params: { id: "prod_OFR2hwegdr49B9" },
      },
    ],
    // fallback true, busca por qualquer parametros
    // fallback false, busca apenas pelos parâmetros estaticos passados
    // fallback blocking busca por qualquer parâmetro porém só renderiza a página ao finalizar o loading
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount! / 100,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora de cache
  };
};
