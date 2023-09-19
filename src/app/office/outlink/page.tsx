"use client"

import { useSearchParams } from "next/navigation";


const OfficeLinkPage = () => {
  const url: string = useSearchParams().get('url')||'';
  return (
    <iframe className='w-full h-full bg-transparent -m-6' src={url}/>
  )
};

export default OfficeLinkPage;
