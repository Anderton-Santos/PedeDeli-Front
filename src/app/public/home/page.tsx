

"use client"

import { useEffect, useState, useRef, useContext } from "react"
import { Plus } from "lucide-react"
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
  const { AddItemCart } = useContext(CartContext)

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

        {/* <section className="flex flex-col gap-12">
          <div
            className="flex text-[14px] py-0 px-2 mt-12 md:flex items-center justify-center mx-auto gap-6 md:text-[18px] font-bold
                        bg-gray-600 w-fit md:py-2 md:px-6 text-gray-300 rounded-2xl"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryName(category.name.toLowerCase())}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategoryName === category.name.toLowerCase()
                    ? "bg-[#f4a261] text-black"
                    : ""
                }`}
              >
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </button>
            ))}
          </div>
        </section> */}

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
          <h1 className="p-16 text-center text-3xl font-black mb-16 mt-10">Produtos Disponíveis</h1>

          {products.length === 0 ? (
            <p className="text-center text-lg text-gray-500">Nenhum produto disponível no momento.</p>
          ) : (
            <section
              className="grid grid-cols-1 place-items-center gap-8 mx-auto md:grid md:grid-cols-2 md:gap-12 md:justify-center md:items-center
                            lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-4"
            >
              {products.map((product) => (
                <div key={product.id} className="bg-[#f4a261] w-[350px] h-[300px] rounded-2xl mb-12">
                  <div className="bg-gray-950 w-[350px] h-[200px] flex items-center justify-center">
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

                  <div className="flex items-center justify-between px-6 py-2">
                    <section className="flex flex-col gap-1">
                      <span className="text-[24px] font-black">{product.name}</span>
                      <span className="text-[20px]">
                        <span className="font-black">Preço:</span> R${" "}
                        <span className="text-gray-600 font-black">{Number(product.price).toFixed(2)}</span>
                      </span>
                    </section>

                    <button
                      className="flex items-center justify-center bg-gray-200 w-[40px] h-[48px] rounded-[8px] duration-300 transform transition-all hover:scale-110 hover:bg-gray-500 hover:text-white"
                      onClick={() => handleAdd(product)}
                    >
                      <Plus size={30} />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}
        </section>
      </div>
    </>
  )
}
