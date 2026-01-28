import { NextResponse } from "next/server";
import { connectDB } from "../../restaurant/route";
import Items from "@/app/models/cartModel";


export async function DELETE(req, {params}){

    const param = await params;

    const id = param.Id;

    // console.log(id);

    await connectDB();
    
    const res = await Items.deleteOne({_id:id});

    return NextResponse.json(res);
}


export async function GET(req, {params}){

    const param = await params;

    const id = param.Id;

    // console.log(id);

    await connectDB();
    
    const res = await Items.find({userId:id});

    return NextResponse.json(res);
}