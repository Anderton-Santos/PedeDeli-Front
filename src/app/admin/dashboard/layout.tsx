// app/admin/dashboard/layout.tsx

'use client'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'


import React from 'react'

export default function Header({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    async function handleLogout(){
        deleteCookie("session", {path: "/"})

        router.replace("/admin/login")


    }


    return (
        <div>
            <header className="flex p-6 md:flex justify-between bg-[#752520] text-white md:p-6">
                <div>
                    <Link href="/admin/dashboard">
                        <h1 className='text-2xl md:text-5xl font-black tracking-tight'>Pede
                            <span className="relative -ml-1 md:tracking-wider md:relative md:-ml-3 text-[#f4a261]">Deli</span>
                        </h1>
                    </Link>


                </div>

                <div className='flex gap-18 md:flex items-center justify-center md:gap-28 font-medium'>
                    <div className='gap-6 md:text-[20px] flex md:gap-12 '>

                        <Link href="/admin/dashboard/product">
                            <span>Produtos</span>
                        </Link>

                        <Link href="/admin/dashboard/category">
                            <span>Categorias</span>
                        </Link>
                    </div>

                    <button onClick={handleLogout} className='mx-1 md:mx-3.5'><LogOut size={36} /></button>


                </div>
            </header>

            <main>{children}</main>
        </div>
    )
}
