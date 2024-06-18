import { connect } from "@/lib/db"
import SurveyResponse from "@/lib/modals/surveyResponse.modal"
import { NextResponse } from "next/server"


export const GET = async () => {
    try{
        await connect()
        const question1 = await SurveyResponse.aggregate([
       
            { $unwind: "$responses" },
   
            { $project: { hours: "$responses.1" } },
 
            { 
                $group: { 
                    _id: "$hours",
                    count: { $sum: 1 }
                } 
            },
          
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
           
            { $sort: { _id: 1 } }
        ])

        const question3 = await SurveyResponse.aggregate([
           
            { $unwind: "$responses" },
          
            { $unwind: "$responses.3" },
           
            { 
                $group: { 
                    _id: "$responses.3",
                    count: { $sum: 1 }
                } 
            },
           
            { 
                $project: { 
                    _id: "$_id",
                    count: 1,
                   
                } 
            },
           
            { $sort: { interest: 1 } }
        ]);

        const question4 = await SurveyResponse.aggregate([
           
            { $unwind: "$responses" },
           
            { $project: { often: "$responses.4" } },
            
            { 
                $group: { 
                    _id: "$often",
                    count: { $sum: 1 }
                } 
            },
            
            { $sort: { _id: 1 } }
        ]);

        const question5 = await SurveyResponse.aggregate([
           
            { $unwind: "$responses" },
           
            { $project: { feel: "$responses.5" } },
            
            { 
                $group: { 
                    _id: "$feel",
                    count: { $sum: 1 }
                } 
            },
            
            { $sort: { _id: 1 } }
        ]);

        const question6 = await SurveyResponse.aggregate([
           
            { $unwind: "$responses" },
           
            { $project: { believe: "$responses.6" } },
            
            { 
                $group: { 
                    _id: "$believe",
                    count: { $sum: 1 }
                } 
            },
            
            { $sort: { _id: 1 } }
        ]);

        const question7 = await SurveyResponse.aggregate([
           
            { $unwind: "$responses" },
           
            { $project: { feelHelps: "$responses.7" } },
            
            { 
                $group: { 
                    _id: "$feelHelps",
                    count: { $sum: 1 }
                } 
            },
            
            { $sort: { _id: 1 } }
        ]);

        const question8 = await SurveyResponse.aggregate([
           
            { $unwind: "$responses" },
           
            { $project: { setTime: "$responses.8" } },
            
            { 
                $group: { 
                    _id: "$setTime",
                    count: { $sum: 1 }
                } 
            },
            
            { $sort: { _id: 1 } }
        ]);
        
        const question9 = await SurveyResponse.aggregate([
           
            { $unwind: "$responses" },
           
            { $project: { appHelp: "$responses.9" } },
            
            { 
                $group: { 
                    _id: "$appHelp",
                    count: { $sum: 1 }
                } 
            },
            
            { $sort: { _id: 1 } }
        ]);

        const question10 = await SurveyResponse.aggregate([
           
            { $unwind: "$responses" },
           
            { $project: { averageGpa: "$responses.10" } },
            
            { 
                $group: { 
                    _id: "$averageGpa",
                    count: { $sum: 1 }
                } 
            },
            
            { $sort: { _id: 1 } }
        ]);
        

        const questionsResponses = [
            { question1 },
            { question2 },
            { question3 },
            { question4 },
            { question5 },
            { question6 },
            { question7 },
            { question8 },
            { question9 },
            { question10 },
        ]

        return NextResponse.json(questionsResponses)
    } catch(err: any){
        console.error("Error fetching the responses", err.message)
    }

}