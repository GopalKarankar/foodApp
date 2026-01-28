import { NextResponse } from "next/server";
import { connectDB } from "../../restaurant/route";
import delivery from "@/app/models/deliveryModel";

export async function GET(req, {params}){
    const param = await params;

    const cityName = param.city;

    // console.log(cityName);

    await connectDB();

    const res = await delivery.find({city: { $regex: cityName, $options: "i" }});

    return NextResponse.json(res);
}