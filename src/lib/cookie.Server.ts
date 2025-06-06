import { cookies } from "next/headers";

export async function getCookiesServer(){
    const tokenStorage = await cookies()
    const token = tokenStorage.get("session")?.value;

    return token || null
}