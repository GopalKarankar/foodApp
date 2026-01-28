import { NextResponse } from "next/server";
import delivery from "@/app/models/deliveryModel";
import { connectDB } from "../../restaurant/route";


export async function POST(req){

    const payload = await req.json();

    // console.log("Food route payload : ", payload);
    
    await connectDB();

    // const result = new delivery(payload);

    // const data = await result.save();

    const data = await new delivery(payload).save();

    console.log(data);

    return NextResponse.json(data);

}