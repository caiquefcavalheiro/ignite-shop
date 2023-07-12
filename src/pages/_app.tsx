import { getCssText } from "@/styles";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      <Component {...pageProps} />
    </main>
  );
}
