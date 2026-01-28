import Orders from "@/app/models/orderModel";
import { connectDB } from "../restaurant/route";
import { NextResponse } from "next/server";

export async function POST(req){

    const payload = await req.json();

    // console.log(payload);

    await connectDB();

    const res = await new Orders(payload).save();

    return NextResponse.json(res);
}


export async function GET(req){

    const userId = req.nextUrl.searchParams.get("userId");

    await connectDB();

    const res = await Orders.find({userId:userId});   
    
    if (res) {

        // console.log(res);

        return NextResponse.json(res);
    
    }else{

        return NextResponse.json(res);
    }

}



export async function DELETE(req) {

  const { state, orderId, itemId } = await req.json();

  console.log(orderId, itemId, state);

  await connectDB();


    if (state === "single") {
        
        const res = await Orders.findByIdAndUpdate(
                orderId,
                { $pull: { 
                    items: { _id: itemId } 
                    } 
                },
                { new: true }
            );

              return NextResponse.json(res);

    } else if(state === "complete"){
                
        const res = await Orders.deleteOne(
                { _id: orderId }
            );

              return NextResponse.json(res);

    }


}