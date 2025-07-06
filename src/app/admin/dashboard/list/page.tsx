

"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { api } from "@/services/api"
import { getCookieClient } from "@/lib/cookieClient"

interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  price: number
  banner?: string
}

export default function ListProducts() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])

  const token = getCookieClient() // pega o token do cookie do cliente

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get("/category", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCategories(response.data)
    }

    fetchCategories()
  }, [token])

  useEffect(() => {
    async function fetchProducts() {
      if (!selectedCategory) return

      const response = await api.get("/category/product", {
        params: { category_id: selectedCategory },
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(response.data)
    }

    fetchProducts()
  }, [selectedCategory, token])

  return (
    <div className="max-w-[100%] mx-auto w-full min-h-screen p-8">

      <section className="flex flex-col gap-12 mb-8">
        {/* <div className="flex justify-around w-[50%] mx-auto text-xl font-extrabold text-gray-400"></div> */}
        <div className="hidden">
          <button>Retirada</button>
          <button>Encomendas</button>
        </div>

        {/* CATEGORIAS */}
        <div className="flex text-[14px] py-0 px-2 mt-12 md:flex items-center justify-center mx-auto gap-6 md:text-[18px] font-bold
         bg-gray-600 w-fit md:py-2 md:px-6 text-gray-300 rounded-2xl">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category.id ? "bg-amber-400 text-black" : ""
                }`}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </div>
      </section>


      <section>
        <h1 className="p-16 text-center text-4xl font-black mb-8">Produtos Cadastrados</h1>

        {products.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Nenhum produto disponivel no momento.</p>
        ) : (
          <section className="grid grid-cols-1 place-items-center gap-8 mx-auto  md:grid md:grid-cols-2 md:gap-12 md:justify-center md:items-center
    lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-4">
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

                <div className="flex justify-between items-center px-4 py-2">
                  <section className="flex flex-col">
                    <span className="text-[24px] font-black">{product.name}</span>
                    <span className="text-[20px]">
                      <span className="font-black">Preço:</span> R$ <span className="text-gray-600 font-black">{Number(product.price).toFixed(2)}</span>
                    </span>
                  </section>

                  <button className="flex items-center justify-center bg-gray-200 w-[40px] h-[48px] rounded-[8px] duration-300 transform transition-all hover:scale-110 hover:bg-gray-500 hover:text-white">
                    <Trash2 size={30} />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </section>

    </div>
  )
}


