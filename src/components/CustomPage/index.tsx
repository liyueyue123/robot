"use client"
import MyTooltip from "@/components/MyTooltip";
import { Avatar, Box, Card, Flex, Grid, IconButton, useTheme } from "@chakra-ui/react";
import MyIcon from '@/components/Icon'
import { useRouter, useSearchParams } from "next/navigation";
// import Avatar from '@/components/Avatar';
import styles from './index.module.css';
import { PageRouterEntity } from "@/types/page";

const ChisonLinks = (props: {customInfo: PageRouterEntity}) => {
  const { customInfo } = props
  const theme = useTheme();
  const router = useRouter();

  /* useSearchParams传参 */
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  };

  return (
    <>
      <Box className='w-full text-2xl font-bold text-blue-700 pb-6'>我的{customInfo.label}</Box>
      <Grid
        gridTemplateColumns={['1fr', 'repeat(3,1fr)', 'repeat(4,1fr)', 'repeat(5,1fr)']}
        gridGap={5}
      >
        {Array.isArray(customInfo.ItemList)&&customInfo.ItemList?.map((app) => (
          <Card
            key={app.id}
            py={4}
            px={5}
            cursor={'pointer'}
            h={'140px'}
            border={theme.borders.md}
            // border={'none'}
            boxShadow={'none'}
            userSelect={'none'}
            position={'relative'}
            // className='bg-white dark:bg-zinc-900'
            _hover={{
              boxShadow: '1px 1px 10px rgba(0,0,0,0.2)',
              borderColor: 'transparent',
              '& .delete': {
                display: 'block'
              },
              '& .chat': {
                display: 'block'
              }
            }}
            onClick={() => 
              router.push(`${customInfo.link}/outlink?${createQueryString('url', app.url)}`)
            }
          >
            <Flex alignItems={'center'} h={'38px'}>
              <Avatar name={app.avatarName} className='w-6 h-6' />
              <Box ml={3}>{app.name}</Box>
            </Flex>
            <Box
              className={styles.intro}
              py={2}
              wordBreak={'break-all'}
              fontSize={'sm'}
              color={'myGray.600'}
            >
              {app.desc || '这个应用还没写介绍~'}
            </Box>
            <IconButton
              className="chat"
              position={'absolute'}
              right={4}
              bottom={4}
              size={'sm'}
              icon={
                <MyTooltip label={'去聊天'}>
                  <MyIcon name={app.icon as any} w={'14px'} />
                </MyTooltip>
              }
              variant={'base'}
              borderRadius={'md'}
              aria-label={'delete'}
              display={['', 'none']}
              _hover={{
                bg: 'myGray.100'
              }}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/chat`);
              }}
            />
          </Card>
        ))}
      </Grid>
    </>
  )
};

export default ChisonLinks;
