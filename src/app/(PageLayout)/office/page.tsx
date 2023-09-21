"use client"
import CustomPage from "@/components/CustomPage";
import Main from "@/components/Layout/Main/page";
import { PageRouterEntity } from "@/types/page";
import routerJson from '@/utils/router.json'

const OfficePage = ()=>{
  const pageInfos: PageRouterEntity =  routerJson?.navbar[1] as PageRouterEntity
  return (
    <Main>
      <CustomPage customInfo={pageInfos}/>
    </Main>
  )
}

export default OfficePage;
