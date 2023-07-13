import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { useRouter } from "next/router";

export default function Product() {
  const {
    query: { id },
  } = useRouter();

  console.log(id);

  return (
    <>
      <ProductContainer>
        <ImageContainer></ImageContainer>
        <ProductDetails>
          <h1>Camiseta X</h1>
          <span>R$ 79,90</span>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
            veritatis dolor reprehenderit ullam, sapiente cupiditate dolore in,
            voluptate incidunt culpa, voluptatibus iure at repellendus nostrum
            ratione consequuntur molestiae illum mollitia.
          </p>
          <button>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
