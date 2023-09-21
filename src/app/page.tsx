"use client"

import { useEffect } from "react";
import ChatPage from "./(PageLayout)/chat/page";
import PageLayout from "./(PageLayout)/layout";
import { invoke } from "@tauri-apps/api/tauri";
import { useScreenWidth } from "@/hooks/useScreenWidth";
// import { Inter } from "next/font/google";
import { changeTheme } from "@/utils/theme";


const HomePage = () => {
  // const inter = Inter({subsets: ["latin"]});
  const { setScreenWidth } = useScreenWidth()
  
  /* 设置主题 */
  useEffect(()=>{
    // changeTheme();
  },[])

  /* pc/mobile 自适应 */
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
    <PageLayout>
      <ChatPage />
    </PageLayout>
  )
};

export default HomePage;
