

"use client"

import { useEffect, useState, useRef, useContext } from "react"
import { Plus, Info, ShoppingCart } from "lucide-react"
import { api } from "@/services/api"
import { CartContext } from "@/context/CartContext"
import Link from "next/link"
import Header from "../components"

export interface Product {
  id: string
  name: string
  price: number
  banner?: string
}

interface Category {
  id: string
  name: string
}

export default function ListProductsPublic() {
  const { AddItemCart, cartAmount } = useContext(CartContext)

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])

  const initialSelectedRef = useRef(false)

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get("/public/category")
      setCategories(response.data)

      if (!initialSelectedRef.current) {
        const bebidasCategory = response.data.find(
          (cat: Category) => cat.name.toLowerCase() === "bebidas"
        )
        if (bebidasCategory) {
          setSelectedCategoryName(bebidasCategory.name.toLowerCase())
          initialSelectedRef.current = true
        }
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      if (!selectedCategoryName) return

      const response = await api.get(`/public/products/${selectedCategoryName}`)
      setProducts(response.data)
    }

    fetchProducts()
  }, [selectedCategoryName])

  function handleAdd(product: Product) {
    AddItemCart(product)
    console.log(product)
  }

  return (
    <>
      <section>
        <Header />
      </section>
      <div className="max-w-full mx-auto w-full min-h-screen p-8 bg-[#f8f1e4]">

        <section className="flex flex-col gap-12">
          {/* Select para telas pequenas */}
          <div className="block md:hidden mt-12">
            <select
              value={selectedCategoryName}
              onChange={(e) => setSelectedCategoryName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-600 font-bold text-gray-200"
            >
              {categories.map((category) => (
                <option key={category.id}
                  value={category.name.toLowerCase()}
                  className="font-medium"
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Botões para telas médias e maiores */}
          <div
            className="hidden md:flex text-[14px] py-0 px-2 md:mt-12 items-center justify-center mx-auto gap-6 md:text-[18px] font-bold
               bg-gray-600 w-fit md:py-2 md:px-6 text-gray-300 rounded-2xl"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryName(category.name.toLowerCase())}
                className={`px-4 py-2 rounded-lg ${selectedCategoryName === category.name.toLowerCase()
                  ? "bg-[#f4a261] text-black"
                  : ""
                  }`}
              >
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </button>
            ))}
          </div>
        </section>


        <section>
          <h1 className="p-16 text-center text-3xl font-black mb-16 mt-10 text-black">Produtos Disponíveis</h1>

          {products.length === 0 ? (
            <p className="text-center text-lg text-gray-500">Nenhum produto disponível no momento.</p>
          ) : (
            <section
              className="grid grid-cols-2 place-items-center gap-8 mx-auto 
                          md:grid md:grid-cols-2 md:gap-12 md:justify-center md:items-center
                          lg:grid lg:grid-cols-3 
                          xl:grid xl:grid-cols-4"
            >
              {products.map((product) => (
                <div key={product.id} className="bg-[#f4a261] w-[160px] h-[300px] rounded-2xl mb-12 md:w-[350px] md:h-[300px]">
                  <div className="bg-gray-950 w-[160px] h-[200px] flex items-center justify-center md:w-[350px] md:h-[200px]">
                    {product.banner ? (
                      <img
                        src={product.banner}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                    ) : (
                      <span className="text-white">Sem imagem</span>
                    )}
                  </div>

                  <div className="flex items-center justify-around px-1 py-2">
                    <section className="flex flex-col ">
                      <span className="text-[18px] font-black text-black md:text-[24px]">{product.name}</span>
                      <span className="text-[20px]">
                        <span className="font-black text-black">R$</span> {" "}
                        <span className="text-gray-800 font-black text-[18px] md:text-[24px]">{Number(product.price).toFixed(2)}</span>
                      </span>
                    </section>

                    <div className="flex">
                      <button
                        className=" flex items-center justify-center text-black bg-gray-200 w-[30px] h-[38px] rounded-[8px] duration-100 
                        transform transition-all md:w-[40px] md:h-[48px] hover:scale-110 hover:bg-gray-500 hover:text-white active:bg-gray-900 active:scale-95"
                        onClick={() => handleAdd(product)}
                      >
                        <Plus size={30} className="text-black" />
                      </button>

                      {/* <button
                        className="flex items-center justify-center text-black bg-gray-200 w-[30px] h-[38px] rounded-[8px] duration-300 transform transition-all hover:scale-110 hover:bg-gray-500 hover:text-white"
                        onClick={() => handleAdd(product)}
                      >
                        <Info size={24} className="text-black" />
                      </button> */}
                    </div>

                  </div>
                </div>
              ))}

            </section>

          )}

        </section>

        <Link href="/public/cart">
          <button
            className="fixed bottom-6 right-6 z-[1000] bg-[#752520] text-white p-4 rounded-full shadow-lg hover:bg-gray-800 active:scale-95 transition-all"
            onClick={() => {
              // aqui você pode navegar para a página do carrinho ou abrir um modal, etc.
              console.log("Carrinho clicado!")
            }}
          >
            <ShoppingCart size={28} />
          </button>

          <span className='fixed bg-[#f4a261] p-2 py-1 rounded-full  right-6 bottom-16 z-[1000] font-semibold text-black'>{cartAmount}</span>
        </Link>


      </div>
    </>
  )
}
