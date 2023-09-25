"use client"
import CustomPage from "@/components/CustomPage";
import Main from "@/components/Layout/Main/page";
import { PageRouterEntity } from "@/types/page";
import routerJson from '@/utils/router.json'
import { usePathname } from "next/navigation";

const OfficePage = ()=>{
  const pathname = usePathname()
  const pageInfos: PageRouterEntity =  routerJson.navbar?.filter(n=>n.link===pathname)[0] as PageRouterEntity
  return (
    <Main>
      <CustomPage customInfo={pageInfos}/>
    </Main>
  )
}

export default OfficePage;
