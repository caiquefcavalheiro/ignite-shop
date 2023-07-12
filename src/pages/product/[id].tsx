import { useRouter } from "next/router";

export default function Product() {
  const {
    query: { id },
  } = useRouter();

  console.log(id);

  return (
    <>
      <h1>Rota de id</h1>
    </>
  );
}
