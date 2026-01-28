import { connectStr } from "@/app/models/db";
import Restaurant from "@/app/models/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function connectDB() {
    await mongoose.connect(connectStr);    
}

export async function GET(req) {

    await connectDB();  

    const data = await Restaurant.find();

    console.log(data);
    
    return NextResponse.json(data);
}

export async function POST(req){

    await connectDB();

    const payload = await req.json();

    console.log("route payload : ", payload);

    if (payload.login) {
        
        // for login
        const result = await Restaurant.findOne({email:payload.email, password:payload.password}).select("-password");

        return NextResponse.json(result);

    } else {

        // for signup
        console.log(payload);

        const restaurantData = new Restaurant(payload);

        let result = await restaurantData.save();
            

        return NextResponse.json(result);

    }

}