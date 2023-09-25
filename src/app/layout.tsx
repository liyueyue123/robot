"use client";

import "./globals.css";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '@/utils/theme'
import { Updater } from "@/components/updater";

export default function RootLayout({ children }: any) {

  return (
    <html>
      <body className={'h-screen w-full bg-gray-100 dark:bg-zinc-950'}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {children}
          <Updater />
        </ChakraProvider>
      </body>
    </html>
  );
}
