import { connect } from "@/lib/db"
import SurveyResponse from "@/lib/modals/surveyResponse.modal"
import { NextResponse } from "next/server"


export const GET = async () => {
    try{
        await connect()
        const question1 = await SurveyResponse.aggregate([
            // Unwind the responses array to deconstruct it for further processing
            { $unwind: "$responses" },
            // Project only the hours spent response
            { $project: { hours: "$responses.1" } },
            // Group by the 'hours' field and count occurrences
            { 
                $group: { 
                    _id: "$hours",
                    count: { $sum: 1 }
                } 
            },
            // Optionally sort the results by _id to order them in a specific way
            { $sort: { _id: 1 } }
        ]);

        const question2 = await SurveyResponse.aggregate([
 
            { $unwind: "$responses" },

            { $project: { platform: "$responses.2" } },
   
            { 
                $group: { 
                    _id: "$platform",
                    count: { $sum: 1 }
                } 
            },
            // Optionally sort the results by _id to order them in a specific way
            { $sort: { _id: 1 } }
        ])

        const question3 = await SurveyResponse.aggregate([
            // Unwind the responses array to deconstruct it for further processing
            { $unwind: "$responses" },
            // Unwind the array within responses.3 (assuming this is the array of interests)
            { $unwind: "$responses.3" },
            // Group by the 'interest' field and count occurrences
            { 
                $group: { 
                    _id: "$responses.3",
                    count: { $sum: 1 }
                } 
            },
            // Optionally project to rename _id to interest and sort the results
            { 
                $project: { 
                    interest: "$_id",
                    count: 1,
                    _id: 0
                } 
            },
            // Optionally sort the results by interest
            { $sort: { interest: 1 } }
        ]);



        const questionsResponses = [
            {question1: question1},
            {question2},
            { question3}
        ]

        const data = await SurveyResponse.find()
        return NextResponse.json(questionsResponses)
    } catch(err: any){
        console.error("Error fetching the responses", err.message)
    }

}