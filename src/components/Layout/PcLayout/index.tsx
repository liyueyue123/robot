import Navbar from "../Navbar";
import { usePathname } from "next/navigation";

export default function PcLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
    return (
      <div className='w-full h-full flex flex-col'>
        <div className='h-8'></div>
        <div className='w-full h-full flex-1 flex flex-row'>
          <Navbar />
          <div className={`${!pathname.includes('outlink')?'pl-6 pr-6 pb-6':''} w-full h-full box-border`}> 
            { children }
          </div>
        </div>
      </div>
    );
}
  