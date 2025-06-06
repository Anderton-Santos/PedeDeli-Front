
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { ChefHat } from 'lucide-react';

export default function Login() {

    async function handleLogin(formData: FormData) {
        "use server"
        const email = formData.get("email")
        const password = formData.get("password")

        if (email === "" || password === "") return

        try {

            const response = await api.post("/session", {
                email,
                password
            })

            if (!response.data.token) {
                return
            }

            const expresTime = 60 * 60 * 24 * 30 * 1000;
            (await cookies()).set("session", response.data.token, {
                maxAge: expresTime,
                path: "/",
                httpOnly: false,
                secure: process.env.NODE_ENV === "production"
            })

        } catch (err) {
            console.log(err)
        }

        redirect("/admin/dashboard")
    }

    return (
        <div className="flex h-screen w-full">

            <div className="hidden lg:block bg-[#381d2a] lg:w-1/2">
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

            <div className="w-full lg:flex bg-[#f5efe7] lg:w-1/2   ">
                <section>

                    <div className="text-center text-black text-5xl lg:flex flex-col lg:text-6xl font-black p-12">
                        <span>Olá, seja bem vindo(a), Deseja </span>
                        <span>Fazer Login:</span>
                    </div>

                    <div className="w-[80%] flex lg:flex lg:w-[50%] h-[500px] max-w-[900px]  flex-col items-center justify-center mx-auto  bg-gray-300 mt-10 border-2 rounded-2xl">
                        <form className="flex flex-col items-center justify-center gap-4" action={handleLogin}>
                            <div>
                                <label className="flex flex-col font-semibold" htmlFor="">Email:</label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="DIGITE SEU EMAIL"
                                    className="w-68 lg:block border-1 lg:w-80 h-12 bg-white p-2"
                                />
                            </div>

                            <div>
                                <label className="flex flex-col font-semibold" htmlFor="">Senha:</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="DIGITE SUA SENHA"
                                    className="w-68 lg:block border-1 lg:w-80 h-12 bg-white p-2"
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center w-60 h-10 bg-[#f4a261] border-2 border-white text-gray-700
                            font-semibold text-[18px] duration-100 transform hover:bg-[#e07b3f] hover:scale-110 hover:text-black">
                                <button>Fazer Login</button>

                            </div>


                        </form>

                    </div>
                    <div className="text-center">

                        <Link href="/admin/cadastro">
                            <span className="font-medium">Ainda não nos conhecemos? <span className="font-bold duration-100 hover:text-blue-800 ">Criar Cadastro</span></span>
                        </Link>
                    </div>

                </section>
            </div>
        </div>
    );
}
