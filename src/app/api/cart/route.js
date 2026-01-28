import Items from "@/app/models/cartModel";
import { connectDB } from "../restaurant/route";
import { NextResponse } from "next/server";


export async function POST(req){

    try {

        const payload = await req.json();

        await connectDB();

        // console.log(payload);
        // console.log(itemId);

        const res = await new Items(payload).save();
        
        return NextResponse.json(res);

    } catch (error) {

        return NextResponse.json({ error: error.message }, { status: 500 });

    }

}


export async function GET(req,{params}){

    try {

        await connectDB();

        const res = await Items.find();
        
        return NextResponse.json(res);

    } catch (error) {

        return NextResponse.json({ error: error.message }, { status: 500 });

    }

}