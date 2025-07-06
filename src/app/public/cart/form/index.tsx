
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const FormOrderSchema = z.object({
  name: z.string().min(8, "Nome deve conter no mínimo 8 caracteres"),
  description: z.string().optional(),
  address: z.string().optional(),
  // date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Data inválida" })
});

type FormOrderSchemaType = z.infer<typeof FormOrderSchema>;

export function ValidateForm() {
  const { cart, total} = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormOrderSchemaType>({
    resolver: zodResolver(FormOrderSchema),
  });

  const onSubmit = (data: FormOrderSchemaType) => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    // const formattedDate = new Date(data.date).toLocaleDateString("pt-BR");

    const cartItemsMessage = cart
      .map(item => `• ${item.name} (x${item.amount})`)
      .join("%0A");

    const message = `*Novo Pedido*%0A
      *👤 Nome:* ${data.name}%0A
      *📆 Endereço:* ${data.address}%0A
      *🧾 Itens:*%0A${cartItemsMessage}%0A
      *🗒️ Observações:* ${data.description || "Nenhuma"}%0A
      *💵 *Total do pedido:* ${total}%0A`;

    const phone = "5579996931192";
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

    window.open(whatsappUrl, "_blank");

    reset();
  };

  return (
    <>
      <form
        className=" w-full h-[60%] lg:w-[60%] lg:h-[60%] mx-auto flex flex-col bg-gray-300 p-4 rounded-[8px]"
        id="meu-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center h-full gap-8 border p-4">
          <div className="flex flex-col gap-2">
            <label className="text-[20px] font-extrabold text-black">Digite seu nome:</label>
            <input
              {...register("name")}
              type="text"
              className="border border-black w-64 h-8 p-2 text-black"
              placeholder="Digite seu nome completo"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col items-center gap-2">
            <label className="text-[20px] font-extrabold text-black">Digite seu Endereço:</label>
            <input
              {...register("address")}
              type="text"
              placeholder="Incluir número da residência"
              className="w-64 h-8 p-2 border border-black  text-black"
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>

          <textarea
            {...register("description")}
            placeholder="Alguma Observação?"
            className="border border-black w-[90%] h-[40%] text-black text-[19px] p-2"
          />
        </div>
      </form>

      <div className="flex items-center justify-center">
        <button
          className=" bg-[#bd2c22] text-gray-200 text-3xl font-black py-2 px-6 w-[80%] rounded-[8px] duration-100 transform hover:bg-[#752520] hover:text-white
          hover:scale-110"
          type="submit"
          form="meu-form"
        >
          Finalizar Pedido
        </button>
      </div>
    </>
  );
}
