"use client"

import { useSearchParams } from "next/navigation";
import styles from "@/app/common.module.css"


const ChatLinkPage = () => {
  const url: string = useSearchParams().get('url')||'';
  console.warn('url----',url)
  return (
    <iframe className={`w-full h-full bg-transparent ${styles.custom_scrollbar}`} src={url}/>
  )
};

export default ChatLinkPage;
