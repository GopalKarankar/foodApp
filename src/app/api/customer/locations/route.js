import { NextResponse } from "next/server";
import { connectDB } from "../../restaurant/route";
import Restaurant from "@/app/models/restaurantModel";

export async function GET({}){

    await connectDB();

    let result = await Restaurant.find();

    result = result.map((item)=>(item.city.toLowerCase()));

    result = [...new Set(result.map((item)=>item.toUpperCase()))];

    return NextResponse.json(result);
}