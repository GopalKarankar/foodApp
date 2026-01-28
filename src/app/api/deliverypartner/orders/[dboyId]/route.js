import { connectDB } from "@/app/api/restaurant/route";
import Orders from "@/app/models/orderModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req,{params}){

    const param = await params;

    const dboyId = param.dboyId;

    // console.log(dboyId);

    await connectDB();

    const res = await Orders.find({deliveryBoyId:dboyId});   
    
    return NextResponse.json(res);

}