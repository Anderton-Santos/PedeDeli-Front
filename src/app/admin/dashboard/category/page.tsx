

// import { api } from "@/services/api"
// import { getCookiesServer } from "@/lib/cookie.Server"
// import { redirect } from "next/navigation"
// // import { toast } from "sonner"

// export default async function CreateCategory() {
//   const token = await getCookiesServer()

//   // cadastrar categoria
//   async function handleRegisterCategory(formData: FormData) {
//     "use server"

//     const name = formData.get("name")
//     if (!name || name === "") return

//     const data = { name }

//     try {
//       await api.post("/category", data, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })

     
//       redirect("/admin/dashboard")

//     } catch (err) {
//       console.log(err)
//     }

    
//   }

//   // listar categorias
//   const response = await api.get("/category", {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   const categories = response.data

//   return (
//     <div className="w-full h-screen bg-[#381d2a] text-white flex flex-col ">


//       <section className="flex flex-col gap-[10%] lg:flex lg:flex-row justify-center lg:gap-[40%] items-center flex-grow">

//         <div className="flex flex-col gap-8">
//           <label className="text-6xl font-semibold">Criar categoria:</label>
//           <form action={handleRegisterCategory} className="flex flex-col gap-8 ">
//             <input
//               className="border-2 w-full h-14 p-2 text-[20px] rounded-[8px]"
//               type="text"
//               placeholder="CADASTRAR NOVA CATEGORIA"
//               name="name"
//             />

//             <button
//               className="bg-[#bd2c22] text-gray-200 font-semibold text-2xl p-2 w-full 
//                 border border-gray-200 rounded-[8px] duration-100 transform hover:bg-[#752520] hover:text-white
//           hover:scale-110"
//             >
//               Cadastrar Categoria
//             </button>
//           </form>
//         </div>

//         <div className="flex flex-col justify-center text-justify items-center gap-8 text-2xl">
//           <span className="text-4xl font-extrabold">Categorias Cadastradas</span>
//           <ul className="flex flex-col gap-6 font-medium items-center bg-gray-700 p-12 w-full rounded-2xl">
//             {categories.map((category: { id: string; name: string }) => (
//               <li key={category.id} className="border-b border-white w-full text-center pb-2">
//                 {category.name.toUpperCase()}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//     </div>
//   )
// }

import { api } from "@/services/api"
import { getCookiesServer } from "@/lib/cookie.Server"
import { redirect } from "next/navigation"

export default async function CreateCategory() {
  const token = await getCookiesServer()

  // cadastrar categoria
  async function handleRegisterCategory(formData: FormData) {
    "use server"

    const name = formData.get("name")?.toString()

    if (!name || name.trim() === "") return

    const data = { name }

    // Não usar try/catch para permitir o redirect funcionar corretamente
    await api.post("/category", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    redirect("/admin/dashboard")
  }

  // listar categorias
  const response = await api.get("/category", {
    headers: { Authorization: `Bearer ${token}` },
  })

  const categories = response.data

  return (
    <div className="w-full h-screen bg-[#381d2a] text-white flex flex-col">
      <section className="flex flex-col gap-[10%] lg:flex lg:flex-row justify-center lg:gap-[40%] items-center flex-grow">
        {/* FORMULÁRIO */}
        <div className="flex flex-col gap-8">
          <label className="text-6xl font-semibold">Criar categoria:</label>
          <form action={handleRegisterCategory} className="flex flex-col gap-8">
            <input
              className="border-2 w-full h-14 p-2 text-[20px] rounded-[8px]"
              type="text"
              placeholder="CADASTRAR NOVA CATEGORIA"
              name="name"
            />

            <button
              className="bg-[#bd2c22] text-gray-200 font-semibold text-2xl p-2 w-full 
              border border-gray-200 rounded-[8px] duration-100 transform hover:bg-[#752520] hover:text-white
              hover:scale-110"
            >
              Cadastrar Categoria
            </button>
          </form>
        </div>

        {/* LISTA DE CATEGORIAS */}
        <div className="flex flex-col justify-center text-justify items-center gap-8 text-2xl">
          <span className="text-4xl font-extrabold">Categorias Cadastradas</span>
          <ul className="flex flex-col gap-6 font-medium items-center bg-gray-700 p-12 w-full rounded-2xl">
            {categories.map((category: { id: string; name: string }) => (
              <li
                key={category.id}
                className="border-b border-white w-full text-center pb-2"
              >
                {category.name.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
