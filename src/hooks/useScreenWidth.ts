import { useEffect, useState } from "react"


export const useScreenWidth= () => {
    const [screenWidth,setScreenWidth]= useState<number>()
    const [isPc,setIsPc]= useState<boolean>(true)

    useEffect(()=>{
        if(screenWidth){
            setIsPc(screenWidth < 900 ? false : true)
        }
    },[screenWidth])
    

    return {
        setScreenWidth,
        isPc
    }
}