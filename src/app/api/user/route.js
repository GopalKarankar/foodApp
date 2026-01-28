import User from "@/app/models/userModel";
import { connectDB } from "../restaurant/route";
import { NextResponse } from "next/server";


// For new user sign up
export async function POST(req){

    const payload = await req.json();

    // console.log("Route payload : ", payload);
    
    await connectDB();

    const exists = await User.findOne({email:payload.email}).select("-password");

    if (exists) {

        return NextResponse.json(exists);
        
    } else {

        let data = await new User(payload).save();

        const {password, ...otherData} = data.toObject();

        // console.log(otherData);

        return NextResponse.json(otherData);
        
    }

}


export async function PUT(req){

    const payload = await req.json();

    // console.log(payload);

    await connectDB();

    const res = await User.findOneAndUpdate(
        { _id: payload._id },
        { $set: payload },
        { new: true, runValidators: true },
    );

    return NextResponse.json(res);
        
}