import { NextResponse } from "next/server";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


export async function GET() {
    
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(user){
        return NextResponse.json(user)
    }else{
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
}