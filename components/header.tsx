'use client'

import { Menu, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { UserNav } from "./user-nav"

export default function Header( { user } : any ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('pt');
  const pathname = usePathname();
  const locale = pathname.split('/')[1]

  useEffect(()=>{
    const langPattern = pathname.split('/')[1]
    setLanguage(langPattern)
  },[])

  const links = [
    { path: `/${locale}`, label: "Início" },
    { path: `/${locale}/#services`, label: "Serviços" },
    { path: `/${locale}/contact`, label: "Contacto" },
    // { path: `/${locale}/contests`, label: lang.public.home.header.contests },
    // { path: `/${locale}/requests`, label: lang.public.home.header.requests },
    // { path: `/${locale}/jobs`, label: lang.public.home.header.jobs },
    // { path: `/${locale}/tasks`, label: lang.public.home.header.tasks },
  ]

  return (
    <header className="py-2 px-5 pt-4 sm:px-3 sticky z-[999] top-0 lg:px-8 border-b text-sm bg-white/10 dark:bg-black/10 backdrop-blur">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href={`/${language}`} className="flex items-center">
            <Sparkles className="size-4 lg:size-8 text-primary mr-2" />
            <span className="text-lg lg:text-2xl font-bold text-primary"> Memorize </span>
          </Link>
          <nav className="hidden md:block">
          <ul className="flex space-x-8 capitalize">
            {links.map((link: { path: string, label: string }) => {
              const isActive = 
                link.path === `/${locale}`
                  ? pathname === link.path
                  : pathname.startsWith(link.path);

              return (
                <li key={link.path}>
                  <Link href={link.path} className={isActive ? 'text-indigo-500 dark:text-indigo-400' : ''}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          </nav>

          <div className="flex items-center gap-3">
            
            <UserNav user={user} />
            <button 
              className="md:hidden text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-4">
                { links.map((link: { path: string, label: string }) => {
                  const isActive = 
                    link.path === `/${locale}`
                      ? pathname === link.path
                      : pathname.startsWith(link.path);

                  return (
                    <li key={link.path}>
                      <Link href={link.path} className={isActive ? 'text-indigo-500 dark:text-indigo-400' : ''}>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}              
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}