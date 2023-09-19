"use client"
import { useSearchParams } from "next/navigation";

const TooboxLinkPage = () => {
  const url: string = useSearchParams().get('url')||'';

  return (
    <iframe className='w-full h-full bg-transparent' src={url}/>
  )
};

export default TooboxLinkPage;
