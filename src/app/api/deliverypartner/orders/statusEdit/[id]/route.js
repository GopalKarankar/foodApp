import { connectDB } from "@/app/api/restaurant/route";
import Orders from "@/app/models/orderModel";
import { NextResponse } from "next/server";

export async function PUT(req, {params}){

    const param = await params;
    const id = param.id;

    // console.log(id);

    const payload = await req.json();
    console.log(payload);

    await connectDB();

    const res = await Orders.findOneAndUpdate({_id:id},payload);

    return NextResponse.json(res);
}