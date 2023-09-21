"use client"
import { Box,Image, useInterval } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LOGO_ICON } from '@/utils/common';
import styles from '@/app/common.module.css'
import { invoke } from '@tauri-apps/api/tauri';

const LoadingPage = () => {
    let [count, setCount] = useState(5);
    const router = useRouter()
    useInterval(() => {
        setCount(count - 1);
    }, 1000);
    useEffect(()=>{
        if(count<=0){
            invoke('close_splashscreen')  //关闭闪屏
            invoke('run_check_update',{ silent: true, hasMsg: false })  //自动检查更新
        }
    },[count, router])
    return (
        <Box className='w-full h-full bg-white flex flex-col'>
            {/* <Box className='w-full px-6 pt-6 flex justify-end'>
                <Box className=' w-20 h-10 rounded-full bg-gray-300 text-white text-lg flex justify-center items-center'>
                    {count}
                </Box>
            </Box> */}
            <Box className='flex-1 flex justify-center items-center'>
                {/* <Image 
                    className='w-36 h-36 animate-spin-slow' 
                    src={LOGO_ICON}
                    borderRadius={'50%'}
                    objectFit={'cover'}
                    alt=""
                    p={'1px'}
                /> */}
                <Box className={`${styles.delay_0} text-blue-600 text-9xl animate-fadeIn`}>C</Box>
                <Box className={`${styles.delay_2} text-blue-600 text-9xl animate-fadeIn`}>H</Box>
                <Box className={`${styles.delay_4} text-blue-600 text-9xl animate-fadeIn`}>I</Box>
                <Box className={`${styles.delay_6} text-blue-600 text-9xl animate-fadeIn`}>S</Box>
                <Box className={`${styles.delay_8} text-blue-600 text-9xl animate-fadeIn`}>O</Box>
                <Box className={`${styles.delay_10} text-blue-600 text-9xl animate-fadeIn`}>N</Box>
            </Box>
        </Box>
    )
};

export default LoadingPage;
