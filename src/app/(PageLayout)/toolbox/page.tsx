"use client"

import routerJson from '@/utils/router.json'
import CustomPage from "@/components/CustomPage";
import { PageRouterEntity } from '@/types/page';
import Main from '@/components/Layout/Main/page';

const ToolboxPage = () => {
    const pageInfos: PageRouterEntity =  routerJson?.navbar[2] as PageRouterEntity
    return (
      <Main>
        <CustomPage customInfo={pageInfos}/>
      </Main>
    )
};

export default ToolboxPage;
