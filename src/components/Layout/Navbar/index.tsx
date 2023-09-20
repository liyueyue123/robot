"use client";

import { Center, Box, Flex } from "@chakra-ui/react";
import Avatar from "@/components/Avatar";
import { useRouter,usePathname } from "next/navigation";
import MyIcon from '@/components/Icon'
import routerJson from '@/utils/router.json'

const HUMAN_ICON = `/icon/human.png`;

/* 左侧导航栏 */
const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  return (
    <div className='h-full w-36 pt-6 box-border bg-white dark:bg-slate-900'>
      <Center className='mb-5 pt-6'>
        <Avatar className='w-16 h-16' src={HUMAN_ICON} />
      </Center>
      <Flex flexDirection='column'>
        {routerJson.navbar.map(item=>(
          <Center key={item.link}>
            <Box 
              className='w-20 h-16'
              {...itemStyles}
              {...(item.activeLink.includes(pathname)
                ? {
                    color: 'myBlue.700',
                    bg: 'white !important',
                    boxShadow: '1px 1px 10px rgba(0,0,0,0.2)'
                  }
                : {
                    color: 'myGray.500',
                    backgroundColor: 'transparent'
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
