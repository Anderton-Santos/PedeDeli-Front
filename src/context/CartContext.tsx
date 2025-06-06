// "use client"

// import { createContext, ReactNode, useState } from "react";

// import { Product } from "@/app/public/home/page";

// interface CartProps {
//     id: string;
//     name: string;
//     banner?: string;
//     price: number;
//     amount: number;
//     total: number
// }

// interface CartContextProps {
//     cart: CartProps[]
//     AddItemCart: (item: Product) => void
//     RemoveItemCart: (item:CartProps) => void
//     total: string
    
// }

// export const CartContext = createContext({} as CartContextProps)

// export function CartProvider({ children }: { children: ReactNode }) {
//     const [cart, setCart] = useState<CartProps[]>([])
//     const [total, setTotal] = useState("")

//     function AddItemCart(item:Product){
//         const index = cart.findIndex(prev => prev.id === item.id)

//         if(index !== -1){
//             //acrecentar + 1 no amount
//             let newAmount = [...cart]
//             newAmount[index].amount = newAmount[index].amount + 1
//             newAmount[index].total = newAmount[index].amount *
//                                     newAmount[index].price

//                 setCart(newAmount)
//                 ResultCart(newAmount)
//                 return
//         }

        
//         //Adicionar novo item

//         let data = {
//             ...item,
//             amount: 1,
//             total: item.price
            
//         }
//         setCart(prev => [...prev, data])
//         ResultCart([...cart, data])
//     }

//     function RemoveItemCart(item:CartProps){
//         const index = cart.findIndex(prev => prev.id === item.id)
//         if(cart[index]?.amount > 1){
//             let newAmount= [...cart]
//             newAmount[index].amount = newAmount[index].amount - 1
//             newAmount[index].total = newAmount[index].amount * newAmount[index].price
//             setCart(newAmount)
//             return


//         }

//         const removeItem = cart.filter(prev => prev.id !== item.id)
//         setCart(removeItem)
//         ResultCart(removeItem)
//     }

//     function ResultCart(items:CartProps[]){
//         let myCart = [...items]
//         let result = myCart.reduce((acc, obj ) => { return acc + obj.total}, 0)
//         const Resultformat = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
//         setTotal(Resultformat)
//     }


//     return (
//         <CartContext.Provider value={{
//             cart,
//             AddItemCart,
//              RemoveItemCart,
//              total
//         }}>
//             {children}
//         </CartContext.Provider>




//     )
// }


"use client"

import { createContext, ReactNode, useState, useEffect } from "react";
import { Product } from "@/app/public/home/page";

interface CartProps {
    id: string;
    name: string;
    banner?: string;
    price: number;
    amount: number;
    total: number;
}

interface CartContextProps {
    cart: CartProps[];
    cartAmount: number;
    AddItemCart: (item: Product) => void;
    RemoveItemCart: (item: CartProps) => void;
    total: string;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("");

    useEffect(() => {
        const result = cart.reduce((acc, obj) => acc + obj.total, 0);
        const formattedResult = result.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        setTotal(formattedResult);
    }, [cart]);

    function AddItemCart(item: Product) {
        const index = cart.findIndex(prev => prev.id === item.id);

        if (index !== -1) {
            // adiciona +1 no amount
            let newCart = [...cart];
            newCart[index].amount += 1;
            newCart[index].total = newCart[index].amount * Number(newCart[index].price);
            setCart(newCart);
            return;
        }

        // Item novo no carrinho
        const newItem = {
            ...item,
            amount: 1,
            total: Number(item.price)
        };
        setCart(prev => [...prev, newItem]);
    }

    function RemoveItemCart(item: CartProps) {
        const index = cart.findIndex(prev => prev.id === item.id);
        if (cart[index]?.amount > 1) {
            let newCart = [...cart];
            newCart[index].amount -= 1;
            newCart[index].total = newCart[index].amount * Number(newCart[index].price);
            setCart(newCart);
            return;
        }

        const filteredCart = cart.filter(prev => prev.id !== item.id);
        setCart(filteredCart);
    }

    return (
        <CartContext.Provider value={{
            cart,
            cartAmount: cart.length,
            AddItemCart,
            RemoveItemCart,
            total
        }}>
            {children}
        </CartContext.Provider>
    );
}
