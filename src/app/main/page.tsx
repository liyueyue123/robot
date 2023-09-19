"use client";
import { changeTheme, getTheme } from "@/utils/theme";
import React from "react";
const MainPage = () => {

  const handleTheme = ()=>{
    const theme = getTheme()
    changeTheme(theme==='dark'?'light':'dark')
  }
  return (
    <>
      <div className='text-red-600 cursor-pointer' 
        onClick={()=>handleTheme()}>
        切换主题
      </div>
      <div className="bg-globalBg">globalBg</div>
      <div className="bg-globalBgInvert text-globalBgInvert">globalBgInvert</div>
      <div className="border-badgesPurpleBorder border">badgesPurpleBorder</div>
      <div>home</div>
    </>
  );
};
export default MainPage;
