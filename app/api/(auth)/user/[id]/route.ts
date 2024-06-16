import { connect } from "@/lib/db"
import User from "@/lib/modals/user.modal"
import { NextResponse } from "next/server"


export const GET = async (req: Request, { params}: any) => {
    const { id } = params
    try{
        await connect()
        const user = await User.findOne({ clerkId: id})
        return NextResponse.json(user)

    }catch(err: any){
        console.error("Error fetching the user", err.message)
    }
}