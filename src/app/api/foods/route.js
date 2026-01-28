import Food from "@/app/models/foodModel";
import { connectDB } from "../restaurant/route";
import { NextResponse } from "next/server";

export async function POST(req) {

    const payload = await req.json();

    console.log("Food route payload : ", payload);
    
    await connectDB();

    // const result = new Food(payload);

    // const data = await result.save();

    const data = await new Food(payload).save();

    console.log(data);

    return NextResponse.json(data);
}