import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import { connectDB } from "../../restaurant/route";

export async function POST(req){
    
    const payload = await req.json();

    await connectDB();

    const res = await User.findOne({email:payload.email, password:payload.password}).select("-password");

    return NextResponse.json(res);
}