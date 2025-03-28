import "@/styles/globals.css";
import "@/styles/output.css"
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <Component {...pageProps}/>
    </HeroUIProvider>
  )
}
