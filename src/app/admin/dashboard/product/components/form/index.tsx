// "use client"

// import { ChangeEvent, useState } from "react"
// import Image from "next/image"
// import { UploadCloudIcon } from "lucide-react"
// import { api } from "@/services/api"
// import { getCookieClient } from "@/lib/cookieClient"


// interface CategoryProps {
//     id: string;
//     name: string;

// }

// interface Props {
//     categories: CategoryProps[]
// }


// export function Form({ categories }: Props) {
//     const [image, setImage] = useState<File>()
//     const [previewImage, setPreviewImage] = useState("")

//     async function handleRegisterAction(formData: FormData) {
//         const categoryIndex = formData.get("category")
//         const name = formData.get("name")
//         const price = formData.get("price")
//         const description = formData.get("description")
//         const type = formData.get("type")

//         if (!name || !categoryIndex || !price || !description || !image || !type) {
//             return
//         }

//         const data = new FormData();

//         data.append("name", name)
//         data.append("price", price)
//         data.append("description", description)
//         data.append("category_id", categories[Number(categoryIndex)].id)
//         data.append("file", image)
//         data.append("type", type)

//         const token = getCookieClient();

//         await api.post("/product", data, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//             .catch((err) => {
//                 console.log(err);
//                 return;
//             })

//         console.log("CADASTRADO COM SUCESSO!")


//     }

//     function handleFile(e: ChangeEvent<HTMLInputElement>) {
//         if (e.target.files && e.target.files[0]) {
//             const image = e.target.files[0];

//             if (image.type !== "image/jpeg" && image.type !== "image/png") {
//                 console.log("FORMATO PROIBIDO!!")
//                 return;
//             }
//             setImage(image);
//             setPreviewImage(URL.createObjectURL(image))
//         }
//     }


//     return (
//         <main className="p-8 flex flex-col h-screen">
//             <h1 className="text-3xl  md:text-3xl font-black text-white">Cadastrar novo produto</h1>

//             <form
//                 action={handleRegisterAction}
//                 className="flex flex-col gap-6 flex-grow items-center justify-center"
//             >


//                 <label
//                     className="relative cursor-pointer flex items-center flex-col justify-center border-2 
//                      border-gray-400 text-white h-[250px] w-[400px] bg-[#1b0d14] rounded-2xl overflow-hidden"
//                 >
//                     <UploadCloudIcon
//                         size={36}
//                         className="duration-150 transition-all hover:scale-125 z-[999] opacity-75 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//                     />

//                     <input
//                         type="file"
//                         accept="image/png, image/jpeg"
//                         required
//                         onChange={handleFile}
//                         className="hidden"
//                     />

//                     {previewImage && (
//                         <Image
//                             src={previewImage}
//                             alt="Imagem preview"
//                             quality={100}
//                             priority={true}
//                             fill={true}
//                             style={{ objectFit: "cover" }}
//                             className="rounded-2xl"
//                         />
//                     )}
//                 </label>


//                 <section>
//                     <div className="flex flex-col items-center justify-center gap-8">

//                         <div className="flex items-center justify-center gap-6 w-full">
//                             <div className="flex flex-col">
//                                 <label className=" text-white text-2xl font-medium mb-2">Nome:</label>
//                                 <input
//                                     name="name"
//                                     type="text"
//                                     placeholder="Digite o nome do produto"
//                                     className="w-[220px] border-2 border-gray-200 md:border-2 md:border-gray-200 md:w-[300px] h-8 p-2 text-gray-300 font-medium"

//                                 />
//                             </div>

//                             <div className="flex flex-col">

//                                 <label htmlFor="" className=" text-white text-2xl font-medium mb-2">Preço:</label>
//                                 <input
//                                     name="price"
//                                     type="text"
//                                     placeholder="Digite o preço"
//                                     className="border-2 border-gray-200 font-medium w-[150px] h-8 p-2 text-gray-300"

//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-col">
//                             <label className=" text-white text-2xl font-medium mb-2">Selecionar Categoria:</label>

//                             <select name="category" className="flex items-center justify-center mx-auto border-2 border-gray-200 font-medium w-[180px] h-12 p-2 text-gray-300">
//                                 {categories.map((category, index) => (
//                                     <option
//                                         className="text-black font-medium"
//                                         key={category.id}
//                                         value={index}>
//                                         {category.name}

//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="flex flex-col text-white w-[100%] ">
//                             <label className="text-2xl font-medium mb-2">Descrição:</label>

//                             <textarea
//                                 name="description"
//                                 id=""
//                                 className="border-2 w-full m-h-[120px] h-22 p-2"></textarea>
//                         </div>
//                     </div>
//                 </section>

//                 <div className="hidden">
//                     <select name="type" className="flex items-center justify-center mx-auto border-2 border-gray-200 
//                     font-medium w-[180px] h-12 p-2 text-gray-300">
//                         <option value="retirada" className="font-medium text-black" >
//                             Retiradas
//                         </option>
//                         <option value="encomenda" className="font-medium text-black" >
//                             Encomendas
//                         </option>

//                     </select>
//                 </div>

//                 <button className="w-full bg-[#bd2c22] text-gray-300 md:bg-[#bd2c22] text-[20px] font-semibold p-2 
//                 md:w-[20%] rounded-[8px] border-2 border-gray-800  transition-all duration-100 transform hover:bg-[#752520] hover:text-white
//                 hover:scale-110">Cadastrar Produto</button>
//             </form>

//         </main>
//     )
// }


"use client"

import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { UploadCloudIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { api } from "@/services/api"
import { getCookieClient } from "@/lib/cookieClient"

interface CategoryProps {
  id: string
  name: string
}

interface Props {
  categories: CategoryProps[]
}

export function Form({ categories }: Props) {
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState("")
  const router = useRouter()

  async function handleRegisterAction(formData: FormData) {
    const categoryIndex = formData.get("category")
    const name = formData.get("name")
    const price = formData.get("price")
    const description = formData.get("description")
    const type = formData.get("type")

    if (!name || !categoryIndex || !price || !description || !image || !type) {
      console.log("Campos obrigatórios faltando.")
      return
    }

    const data = new FormData()
    data.append("name", name)
    data.append("price", price)
    data.append("description", description)
    data.append("category_id", categories[Number(categoryIndex)].id)
    data.append("file", image)
    data.append("type", type)

    const token = getCookieClient()

    try {
      await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log("Produto cadastrado com sucesso!")
      router.push("/admin/dashboard")
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err)
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        console.log("Formato de imagem não suportado!")
        return
      }

      setImage(image)
      setPreviewImage(URL.createObjectURL(image))
    }
  }

  return (
    <main className="p-8 flex flex-col h-screen">
      <h1 className="text-3xl font-black text-white">Cadastrar novo produto</h1>

      <form
        action={handleRegisterAction}
        className="flex flex-col gap-6 flex-grow items-center justify-center"
      >
        <label
          className="relative cursor-pointer flex items-center flex-col justify-center border-2 
           border-gray-400 text-white h-[250px] w-[400px] bg-[#1b0d14] rounded-2xl overflow-hidden"
        >
          <UploadCloudIcon
            size={36}
            className="transition-all hover:scale-125 z-[999] opacity-75 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
            className="hidden"
          />

          {previewImage && (
            <Image
              src={previewImage}
              alt="Imagem preview"
              quality={100}
              priority
              fill
              style={{ objectFit: "cover" }}
              className="rounded-2xl"
            />
          )}
        </label>

        <section>
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-6 w-full">
              <div className="flex flex-col">
                <label className="text-white text-2xl font-medium mb-2">Nome:</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Digite o nome do produto"
                  className="w-[220px] md:w-[300px] border-2 border-gray-200 h-8 p-2 text-gray-300 font-medium"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white text-2xl font-medium mb-2">Preço:</label>
                <input
                  name="price"
                  type="text"
                  placeholder="Digite o preço"
                  className="w-[150px] border-2 border-gray-200 h-8 p-2 text-gray-300 font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-white text-2xl font-medium mb-2">Selecionar Categoria:</label>
              <select
                name="category"
                className="mx-auto border-2 border-gray-200 font-medium w-[180px] h-12 p-2 text-gray-300"
              >
                {categories.map((category, index) => (
                  <option key={category.id} value={index} className="text-black font-medium">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col text-white w-full">
              <label className="text-2xl font-medium mb-2">Descrição:</label>
              <textarea
                name="description"
                className="border-2 w-full min-h-[120px] p-2"
              />
            </div>
          </div>
        </section>

        <div className="hidden">
          <select
            name="type"
            className="mx-auto border-2 border-gray-200 font-medium w-[180px] h-12 p-2 text-gray-300"
          >
            <option value="retirada" className="text-black font-medium">Retiradas</option>
            <option value="encomenda" className="text-black font-medium">Encomendas</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full md:w-[20%] bg-[#bd2c22] text-[20px] font-semibold p-2 rounded-[8px] border-2 border-gray-800 text-gray-300 transition-all hover:bg-[#752520] hover:text-white hover:scale-110"
        >
          Cadastrar Produto
        </button>
      </form>
    </main>
  )
}
