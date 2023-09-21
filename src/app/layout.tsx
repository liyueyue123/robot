"use client";

import "./globals.css";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '@/utils/theme'
import { UpdateModal } from "./(PageLayout)/settings/modal";

export default function RootLayout({ children }: any) {

  return (
    <html>
      <body className={'h-screen w-full bg-gray-100 dark:bg-zinc-950'}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {/* <PageLayout> */}
              {children}
            {/* </PageLayout> */}
          <UpdateModal />
        </ChakraProvider>
      </body>
    </html>
  );
}
