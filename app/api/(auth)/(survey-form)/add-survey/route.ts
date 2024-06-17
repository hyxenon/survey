import { connect } from "@/lib/db"
import SurveyResponse from "@/lib/modals/surveyResponse.modal"
import { NextResponse } from "next/server"


export const POST = async (request: Request) => {
    try{
        const { clerkId, responses} = await request.json()
        await connect()
        await SurveyResponse.create({clerkId, responses})
        return NextResponse.json({ message: "Response created successfully"}, {status: 200})
    } catch(error: any){
        return new NextResponse('Error in creating user'+ error.message, { status: 500})
    }
}