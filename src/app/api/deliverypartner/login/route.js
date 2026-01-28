import { NextResponse } from "next/server";
import delivery from "@/app/models/deliveryModel";
import { connectDB } from "../../restaurant/route";

export async function POST(req){
    
    const payload = await req.json();

    await connectDB();

    const res = await delivery.findOne({mobileNo:payload.mobileNo, password:payload.password}).select("-password");

    return NextResponse.json(res);
}