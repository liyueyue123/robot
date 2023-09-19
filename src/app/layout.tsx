"use client";
import {Inter} from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { changeTheme } from "@/utils/theme";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '@/utils/theme'
import { useScreenWidth } from "@/hooks/useScreenWidth";
import PcLayout from "@/components/Layout/PcLayout";
import PhoneLayout from "@/components/Layout/PhoneLayout";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
  const { setScreenWidth,isPc } = useScreenWidth()
  useEffect(()=>{
    // changeTheme();
    console.warn('isPc----',isPc)
  },[isPc])

  useEffect(() => {

    window.addEventListener('resize', ()=>{
      setScreenWidth(document.documentElement.clientWidth);
    });

    setScreenWidth(document.documentElement.clientWidth);

    return () => {
      window.removeEventListener('resize', ()=>{
        setScreenWidth(document.documentElement.clientWidth);
      });
    };
  }, [setScreenWidth]);

  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-full bg-gray-100 dark:bg-black`}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {isPc?
            <PcLayout>{children}</PcLayout>:
            <PhoneLayout>{children}</PhoneLayout>
          }
        </ChakraProvider>
      </body>
    </html>
  );
}
