"use client"

import { useContext } from "react"
import { CartContext } from "@/context/CartContext"
import Header from "../components"

import { ValidateForm } from "./form"

export default function CartBuy() {
    const { cart, total, RemoveItemCart, AddItemCart } = useContext(CartContext)
    return (
        <>
            <Header />


            <section className="flex flex-col lg:flex lg:flex-row w-full h-screen ">
                <div className="w-full lg:w-[60%] h-screenbg-[#f5efe7]">
                    <div className="p-8">

                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-around items-center gap-8 p-10 border-b-1 border-gray-800 mt-4 mb-8">
                                <div className="hidden md:block bg-black w-[200px] h-[120px]">
                                    <img
                                        src={item.banner}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />


                                    <span className="text-[19px] font-black p-2">{item.name}</span>
                                </div>


                                {/* <div className="flex flex-col">
                                    <span className="text-[22px] font-black bg-amber-300 w-46 text-center mb-4 md:hidden">{item.name}</span>
                                    <span className="text-[19px] font-medium">Preço: </span>
                                    <span className="text-2xl font-semibold"> {(Number(item.price)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                </div> */}


                                <div>
                                    <div className="flex flex-col">
                                        <span className="text-[24px] font-black bg-gray-300 rounded-2xl w-46 text-center mb-4 mx-auto md:hidden">{item.name}</span>
                                        <span className="text-center lg:text-[19px] font-medium">Preço: </span>
                                        <span className="text-2xl text-center font-semibold mb-6 lg:text-2xl lg:font-semibold lg:mb-0"> {(Number(item.price)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                    </div>



                                    <div className="flex flex-col gap-6 items-center justify-center w-fit lg:hidden">
                                        <div className="flex gap-4 items-center">
                                            <button className="bg-[#752520] text-white w-8 text-2xl font-semibold rounded-2xl duration-100 transform hover:scale-110 hover:bg-[#5e1c1a]" onClick={() => RemoveItemCart(item)}>-</button>
                                            {item.amount}
                                            <button className="bg-[#752520] text-white w-8 text-2xl font-semibold rounded-2xl duration-100 transform hover:scale-110 hover:bg-[#5e1c1a]" onClick={() => AddItemCart(item)}>+</button>
                                        </div>

                                        <div className="flex items-center gap-2 ml-8">
                                            <span className="text-[19px] font-semibold">SubTotal: </span>
                                            <span className="font-bold text-2xl">{(Number(item.total)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                        </div>

                                    </div>

                                </div>




                                {/* MOBILE */}

                                {/* <div className="flex flex-col gap-6 items-center justify-center w-fit bg-amber-300  lg:hidden">
                                    <div className="flex gap-4 items-center">
                                        <button className="bg-[#752520] text-white w-8 text-2xl font-semibold rounded-2xl duration-100 transform hover:scale-110 hover:bg-[#5e1c1a]" onClick={() => RemoveItemCart(item)}>-</button>
                                        {item.amount}
                                        <button className="bg-[#752520] text-white w-8 text-2xl font-semibold rounded-2xl duration-100 transform hover:scale-110 hover:bg-[#5e1c1a]" onClick={() => AddItemCart(item)}>+</button>
                                    </div>

                                    <div className="flex gap-2 ml-8">
                                        <span className="text-[19px] font-semibold">SubTotal: </span>
                                        <span className="font-bold text-2xl">{(Number(item.total)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                    </div>

                                </div> */}

                                {/* MOBILE */}


                                {/* DESKTOP */}
                                <div className="hidden lg:flex gap-4 items-center">
                                    <button className="bg-[#752520] text-white w-8 text-2xl font-semibold rounded-2xl duration-100 transform hover:scale-110 hover:bg-[#5e1c1a]" onClick={() => RemoveItemCart(item)}>-</button>
                                    {item.amount}
                                    <button className="bg-[#752520] text-white w-8 text-2xl font-semibold rounded-2xl duration-100 transform hover:scale-110 hover:bg-[#5e1c1a]" onClick={() => AddItemCart(item)}>+</button>
                                </div>

                                <div className="hidden lg:flex flex-col ">
                                    <span className="text-[19px] font-semibold">SubTotal: </span>
                                    <span className="font-bold text-2xl">{(Number(item.total)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                </div>

                            </div>
                        ))}

                        <span className="text-2xl font-medium">Total do Pedido: <span className="text-3xl font-black">{total}</span></span>






                    </div>
                </div>

                <div className="flex flex-col w-full lg:flex md:flex-col lg:w-[40%] h-screen p-6  gap-16 bg-[#381d2a]">

                    <h1 className="text-[30px] text-white lg:text-white lg:text-[50px] font-black p-2 mt-4 ">Para melhor experiência preencha esse mini-formulário</h1>

                    <ValidateForm />
                </div>

            </section>
        </>
    )
}