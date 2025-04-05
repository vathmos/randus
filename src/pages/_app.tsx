import "@/styles/globals.css"
import "@/styles/output.css"
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { TranslationProvider } from "@/contexts/TranslationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="blurple-dark" themes={["dark", "light", "blurple-dark", "blurple-light"]}>
      <TranslationProvider>
        <HeroUIProvider>
          <ToastProvider />
          <Component {...pageProps} />
        </HeroUIProvider>
      </TranslationProvider>
    </NextThemesProvider>
  )
}
