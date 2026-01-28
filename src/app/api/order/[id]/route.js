import Orders from "@/app/models/orderModel";
import { NextResponse } from "next/server";
import { connectDB } from "../../restaurant/route";


export async function GET(req, {params}){

    const param = await params;
    
    const id = param.id;

    await connectDB();

    const res = await Orders.find({userId:id});   
    
    return NextResponse.json(res);

}