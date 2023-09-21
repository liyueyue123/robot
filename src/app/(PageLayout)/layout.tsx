"use client";

import NavbarPhone from "@/components/Layout/NavBarPhone";
import Navbar from "@/components/Layout/Navbar";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { usePathname } from "next/navigation";

export default function PageLayout({ children }: { children: JSX.Element }) {
  const { isPc } = useScreenWidth()
  const pathname = usePathname();
  return (
    <>
    {isPc?
      <div className='w-full h-full flex flex-col'>
          <div className='w-full h-full flex-1 flex flex-row'>
            <Navbar />
            <div className={`${!pathname.includes('outlink')?'p-8':''} w-full h-full box-border`}> 
              { children }
            </div>
          </div>
      </div>:
      <div className='w-full flex flex-col h-full justify-between'>
          <div className='w-full flex-1 overflow-y-auto bg-white dark:bg-slate-900'>
              {children}
          </div>
          <NavbarPhone />
      </div>
    }
    </>
  );
}
  