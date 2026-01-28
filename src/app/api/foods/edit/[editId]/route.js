import { connectDB } from "@/app/api/restaurant/route";
import Food from "@/app/models/foodModel";
import { NextResponse } from "next/server";

export async function GET(req, {params}){

    const param = await params; 
    
    const id = param.editId;

    await connectDB();
    
    // console.log(id);

    const data = await Food.findOne({_id:id});

    return NextResponse.json(data);

}


export async function PUT(request, {params}){

    const param = await params; 
    
    const id = param.editId;

    const payload = await request.json();

    await connectDB();
    
    // console.log(id);

    const data = await Food.findOneAndUpdate({_id:id},payload);

    return NextResponse.json(data);

}