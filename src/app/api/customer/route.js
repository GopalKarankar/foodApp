import Restaurant from "@/app/models/restaurantModel";
import { NextResponse } from "next/server";
import { connectDB } from "../restaurant/route";

export async function GET(req){

    const queryParam = await req.nextUrl.searchParams;

    let filter = {};

    if (queryParam.get("location")) {
        const city = queryParam.get("location");

         filter =  {
            city: { $regex: city, $options: "i" }
        }
        
    } else if(queryParam.get("restrnt")){
        const rName = queryParam.get("restrnt");        

         filter =  {
            rName: { $regex: rName, $options: "i" }
        }

    }

    await connectDB();

    const res = await Restaurant.find(filter);

    // console.log(res);

    return NextResponse.json(res);

}