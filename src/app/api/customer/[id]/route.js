import {  NextResponse } from "next/server";
import { connectDB } from "../../restaurant/route";
import Restaurant from "@/app/models/restaurantModel";
import Food from "@/app/models/foodModel";
import mongoose from "mongoose";

// const id = new mongoose.Types.ObjectId();
// console.log(id.toString());

export async function GET(req,{params}){

    const param = await params;

    let id = param.id;

    // id = id.toString();

    // console.log(id);

    await connectDB();

    const restaurantData  = await Restaurant.findOne({_id:id});
    const foodData = await Food.find({resto_id:id});
    
    // console.log({restaurantData,foodData});
    
    return NextResponse.json({restaurantData,foodData});
}