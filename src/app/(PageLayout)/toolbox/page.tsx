"use client"

import routerJson from '@/utils/router.json'
import CustomPage from "@/components/CustomPage";
import { PageRouterEntity } from '@/types/page';
import Main from '@/components/Layout/Main/page';
import { usePathname } from 'next/navigation';

const ToolboxPage = () => {
  const pathname = usePathname()
  const pageInfos: PageRouterEntity =  routerJson.navbar?.filter(n=>n.link===pathname)[0] as PageRouterEntity
    return (
      <Main>
        <CustomPage customInfo={pageInfos}/>
      </Main>
    )
};

export default ToolboxPage;
