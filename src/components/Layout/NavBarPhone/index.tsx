import React, { useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Flex, Box } from '@chakra-ui/react';
import MyIcon from '@/components/Icon'
import Badge from '@/components/Badge'
import routerJson from '@/utils/router.json'

const NavbarPhone = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <Box borderTop={'1px solid rgba(0,0,0,0.1)'} className='w-full h-24 bg-white dark:bg-slate-900'>
      <Flex
        alignItems={'center'}
        h={'100%'}
        justifyContent={'space-between'}
        backgroundColor={'white'}
        position={'relative'}
        px={10}
      >
        {routerJson.navbar.map((item) => (
          <Flex
            position={'relative'}
            key={item.link}
            cursor={'pointer'}
            borderRadius={'md'}
            textAlign={'center'}
            alignItems={'center'}
            h={'100%'}
            pt={1}
            px={3}
            transform={'scale(0.9)'}
            {...(item.activeLink.includes(pathname)
              ? {
                  color: '#7089f1'
                }
              : {
                  color: 'myGray.500'
                })}
            _after={
              item.activeLink.includes(pathname)
                ? {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    borderRadius: '50%',
                    w: '18px',
                    h: '18px',
                    bg: ' #6782f1',
                    filter: 'blur(10px)',
                    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
                  }
                : {}
            }
            onClick={() => {
              if (item.link === pathname) return;
              router.push(item.link);
            }}
          >
            <Badge isDot count={0}>
              <MyIcon name={item.icon as any} width={'20px'} height={'20px'} />
              <Box fontSize={'12px'}>{item.label}</Box>
            </Badge>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default NavbarPhone;
