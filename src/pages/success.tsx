import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const { cart } = useContext(CartContext);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>
        <div>
          {products.map((product) => {
            return (
              <ImageContainer key={product.name}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            );
          })}
        </div>
        <p>
          Uhuul <strong>{customerName}</strong>, sua(s){" "}
          <strong>{cart.length} camisas</strong> já está(ão) a caminho da sua
          casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  const products = session.line_items?.data.map((product) => {
    const stripeProduct = product.price?.product as Stripe.Product;
    return {
      name: stripeProduct.name,
      imageUrl: stripeProduct.images[0],
    };
  });

  return {
    props: {
      customerName,
      products: products,
    },
  };
};
