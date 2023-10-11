
export default function Main({children}: {children: React.ReactNode}) {
    return (
      <div className='h-full w-full p-6 rounded-xl box-border overflow-y-auto no-scrollbar bg-white dark:bg-zinc-900' >
        {children}
      </div>
    );
}
  