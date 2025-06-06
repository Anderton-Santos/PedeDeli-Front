
import { Form } from "./components/form"
import { api } from "@/services/api"
import { getCookiesServer } from "@/lib/cookie.Server"

export default async function CreateProduct(){

    const token = await getCookiesServer();

    const response = await api.get("/category", {
        headers : {
            Authorization: `Bearer ${token}`
        }
    })

    console.log(response)
    

    return(
        <div className="bg-[#381d2a] h-screen w-full">
        <Form categories={response.data}/>
        </div>
    )
}