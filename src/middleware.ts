import { NextRequest, NextResponse } from "next/server";
import { getCookiesServer } from "./lib/cookie.Server";
import { api } from "./services/api";

export async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl

    const publicRoutes = ["/", "/admin/login", "/admin/cadastro"];

    if (pathname.startsWith("/_next") ||
        publicRoutes.includes(pathname)) {

            return NextResponse.next()

    }

    const token = await getCookiesServer()
    
    if(pathname.startsWith("/admin/dashboard")){
        if(!token){
        return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    const isValid = await validateToken(token)
    if(!isValid){
         return NextResponse.redirect(new URL("/admin/login", req.url))
    }
    return NextResponse.next()
    }
}

async function validateToken(token:string){
    if(!token) return false;

    try{
        await api.get("/me", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return true

    }catch(err){
        console.log(err)
        return false
    }
}