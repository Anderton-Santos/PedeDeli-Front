import Link from "next/link";


export default function Dashboard() {
    return (
        <div className="flex h-screen w-full bg-[#381d2a]">
            <section className="flex flex-col gap-50 items-center justify-center mx-auto text-white w-full">
                <div className="bg-gray-500 p-4 w-[60%] rounded-[8px] border-2 border-white text-center 
                text-2xl font-semibold text-gray-200 duration-100 transition-all hover:scale-110 hover:bg-gray-800 hover:text-white">
                    <Link href="dashboard/category">
                        <button>Cadastrar Nova Categoria</button>
                    </Link>
                </div>

                <div className="bg-gray-500 p-4 w-[60%] rounded-[8px] border-2 border-white text-center
                 text-2xl font-semibold text-gray-200 duration-100 transition-all hover:scale-110 hover:bg-gray-800 hover:text-white">
                    <Link href="dashboard/product">
                        <button>Cadastrar Novo Produto</button>
                    </Link>


                </div>

                <div className="bg-gray-500 p-4 w-[60%] rounded-[8px] border-2 border-white text-center
                 text-2xl font-semibold text-gray-200 duration-100 transition-all hover:scale-110 hover:bg-gray-800 hover:text-white">
                    <Link href="dashboard/list">
                        <button>Listar Produtos Cadastrados</button>
                    </Link>
                    
                </div>

            </section>
        </div>
    )
}

