"use client";

import { Center, Box, Flex } from "@chakra-ui/react";
import { useRouter,usePathname } from "next/navigation";
import MyIcon from '@/components/Icon'
import { useEffect, useState } from "react";
import { PageRouterEntity } from "@/types/page";
import { invoke } from "@tauri-apps/api/tauri";
import routerLocal from '@/utils/router.json'

const HUMAN_ICON = `/icon/human.png`;

/* 左侧导航栏 */
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [navbar,setNavbar] = useState<PageRouterEntity[]>([])
  const itemStyles: any = {
    my: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 'md',
    _hover: {
      bg: 'myWhite.600'
    }
  };
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
  return (
    <div className='h-full w-36 pt-6 box-border bg-white dark:bg-zinc-900'>
      {/* <Center className='mb-5 pt-6'>
        <Avatar className='w-16 h-16' src={HUMAN_ICON} />
      </Center> */}
      <Flex flexDirection='column' className='pt-4'>
        {navbar&&navbar.map(item=>(
          <Center key={item.link}>
            <Box 
              className='w-20 h-16 hover:bg-white dark:hover:bg-gray-800'
              {...itemStyles}
              {...(item.activeLink.includes(pathname)
                ? {
                    color: 'myBlue.700',
                    boxShadow: '1px 1px 10px rgba(0,0,0,0.2)'
                  }
                : {
                    color: 'myGray.500',
                  })
              }
              {...(item.link !== pathname
                ? {
                    onClick: () => router.push(item.link)
                  }
                : {})
              }
            >
              <MyIcon
                name={
                  item.activeLink.includes(pathname)
                    ? (item.activeIcon as any)
                    : (item.icon as any)
                }
                w={'20px'}
                h={'20px'}
              />
              <Box className='text-xs mt-2 scale-90'>
                {item.label}
              </Box>
            </Box>
          </Center>
        ))}
      </Flex>
    </div>
    
  )
};

export default Navbar;
