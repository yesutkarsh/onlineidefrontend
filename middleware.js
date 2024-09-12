import { NextResponse } from "next/server";

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


export async function middleware(request) {
    const {isAuthenticated} = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if(isUserAuthenticated){
        return NextResponse.next()
    }else{
        return NextResponse.next()

    }
    // return NextResponse.redirect(new URL('/', request.url))
        
}

export const config = {
    matcher: ['/createEnv']
  }