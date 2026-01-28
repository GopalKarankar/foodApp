import Food from "@/app/models/foodModel";
import { NextResponse } from "next/server";
import { connectDB } from "../../restaurant/route";

export async function GET(request, { params }) {

    const param = await params; 
    
    const id = param.id;

    await connectDB();
    
    // console.log(id);

    const data = await Food.find({resto_id:id});

    return NextResponse.json(data);

}


export async function DELETE(request, {params}){

    const param = await params; 
    
    const id = param.id;

    console.log(id);

    await connectDB();

    const data = await Food.deleteOne({_id:id});

    return NextResponse.json(data);

  }