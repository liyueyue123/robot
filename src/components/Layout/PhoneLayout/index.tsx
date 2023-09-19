import NavbarPhone from "../NavBarPhone";

export default function PhoneLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='w-full flex flex-col h-full justify-between'>
            <div className='w-full flex-1 overflow-y-auto bg-white dark:bg-slate-900'>
                {children}
            </div>
            <NavbarPhone />
        </div>
    );
}
  