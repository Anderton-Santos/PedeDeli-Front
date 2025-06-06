
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

import { ChefHat } from 'lucide-react'

export default function Cadastro() {

    async function handleRegister(formData: FormData) {
        "use server"
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        console.log(name)
        console.log(email)
        console.log(password)

        if (name === "" || email === "" || password === "") {
            return
        }

        try {
            await api.post("/users", {
                name,
                email,
                password
            })

        } catch (err) {
            console.log(err)

        }

        redirect("/admin/login")
    }


    return (
        <div className="flex h-screen w-full">

            <div className="w-full lg:flex bg-gray-100 lg:w-1/2   ">
                <section>

                    <div className=" text-center lg:flex flex-col text-6xl font-black p-12 ">
                        <span>Olá, seja bem vindo(a), Deseja </span>
                        <span>Criar Cadastro:</span>
                    </div>

                    <div className="w-[80%] flex lg:flex lg:w-[50%] h-[500px] max-w-[900px] flex-col items-center justify-center mx-auto 
                    bg-gray-300 mt-10 border-2 rounded-2xl ">

                        <form className="flex flex-col items-center justify-center gap-4" action={handleRegister}>

                            <div>
                                <label className="flex flex-col font-semibold" htmlFor="">Nome:</label>
                                <input
                                    type="text"
                                    placeholder="DIGITE SEU NOME"
                                    className="w-68 lg:block border-1 lg:w-80 h-12 bg-white p-2 "
                                    name="name"
                                />
                            </div>

                            <div>
                                <label className="flex flex-col font-semibold" htmlFor="">Email:</label>
                                <input
                                    type="text"
                                    placeholder="DIGITE SEU EMAIL"
                                    className="w-68 lg:block border-1 lg:w-80 h-12 bg-white p-2 "
                                    name="email"
                                />
                            </div>

                            <div>
                                <label className="flex flex-col font-semibold" htmlFor="">Senha:</label>
                                <input
                                    type="password"
                                    placeholder="DIGITE SUA SENHA"
                                    className="w-68 lg:block border-1 lg:w-80 h-12 bg-white p-2 "
                                    name="password"
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center w-60 h-10 bg-[#f4a261] border-2 border-white  text-gray-700 font-semibold text-[18px] 
                             duration-100 transform hover:bg-[#e07b3f] hover:scale-110 hover:text-black">
                            
                                <button>Criar Cadastro</button>

                            </div>


                        </form>

                    </div>
                    <div className="text-center">
                        <Link href="/admin/login">
                            <span className="font-medium">Já nos conhecemos? <span  className="font-bold duration-100 hover:text-blue-800 ">Fazer Login</span></span>
                        </Link>
                    </div>

                </section>
            </div>

            <div className="hidden lg:block bg-[#381d2a] w-1/2">
                <div className="flex items-center justify-center h-screen relative">
                    <h1 className="text-[#f9f9f9] text-6xl font-black tracking-tight relative">
                        Pede
                        <span className="tracking-wider relative -ml-2 text-[#f4a261]">
                            Deli
                            <span className="absolute -top-10 left-[94%] rotate-[20deg]">
                                <ChefHat className="w-12 h-12 text-white" />
                            </span>
                        </span>
                    </h1>
                </div>

            </div>
        </div>
    );
}
