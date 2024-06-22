"use server"
import { connect } from "@/lib/db"
import SurveyResponse from "@/lib/modals/surveyResponse.modal"


export const getTotalCountResponses = async () => {
    await connect()
    const count = SurveyResponse.countDocuments();
    return count
}