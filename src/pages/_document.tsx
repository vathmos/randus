import { Html, Head, Main, NextScript } from "next/document";
import { HeroUIProvider } from "@heroui/react";

export default function Document() {
  return (
    <HeroUIProvider>
      <Html lang="en" className="dark text-foreground bg-background">
        <Head />
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    </HeroUIProvider>
  );
}

