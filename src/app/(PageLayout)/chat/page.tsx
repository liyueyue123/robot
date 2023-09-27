"use client"
import CustomPage from "@/components/CustomPage";
import Main from "@/components/Layout/Main/page";
import { PageRouterEntity } from "@/types/page";
import routerLocal from '@/utils/router.json'
import { invoke } from "@tauri-apps/api/tauri";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const pathname = usePathname()
  const [navbar,setNavbar] = useState<PageRouterEntity[]>([])
  const [pageInfos,setPageInfos] = useState<PageRouterEntity>()
  /* 获取路由 */
  useEffect(()=>{
    const setRouterInfo = async () => {
      const res: any = await invoke('read_extra_url')
      if(res){
        setNavbar(JSON.parse(res).navbar)
      }else{
        setNavbar(routerLocal.navbar as unknown as PageRouterEntity[])
      }
    }
    setRouterInfo()
  },[])
  useEffect(()=>{
    const infos: PageRouterEntity =  navbar?.filter(n=>n.link===pathname||'/')[0] as PageRouterEntity
    setPageInfos(infos)
  },[navbar, pathname])
  
  return (
    <Main>
      <CustomPage customInfo={pageInfos}/>
    </Main>
  )
};

export default ChatPage;

