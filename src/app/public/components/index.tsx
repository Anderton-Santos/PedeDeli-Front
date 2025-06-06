// app/admin/dashboard/layout.tsx

'use client'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useContext } from "react"
import { CartContext } from "@/context/CartContext"


import React from 'react'

export default function Header() {
    const {cartAmount} = useContext(CartContext)


    return (
        <div>
            <header className="flex items-center p-6 md:flex justify-between bg-[#752520] text-white md:p-6">
                <div>
                    <Link href="/">
                        <h1 className='text-2xl md:text-5xl font-black tracking-tight'>Pede 
                            <span className="relative -ml-1 md:tracking-wider md:relative md:-ml-3 text-[#f4a261]">Deli</span>
                        </h1>
                    </Link>


                </div>

                <div className='flex gap-4 sm:flex sm:gap-18 md:flex items-center justify-center md:gap-28 font-medium'>
                    <div className='gap-6 md:text-[20px] flex md:gap-12'>

                        <Link href="#">
                            <span>Home</span>
                        </Link>

                        <Link href="#">
                            <span>Produtos</span>
                        </Link>
                    </div>
                    <Link href="/public/cart">
                        <button className='mx-3.5'><ShoppingCart size={36} /></button>
                        <span className='bg-[#f4a261] p-2 py-1 rounded-full absolute top-2 right-4 font-semibold text-black'>{cartAmount}</span>
                    </Link>



                </div>
            </header>

        </div>
    )
}
