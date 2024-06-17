import {Schema, model, models} from 'mongoose'


const ResponseItemSchema = new Schema({
    type: Schema.Types.Mixed,  
});

const surveyResponseSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    responses: [{
      
    }]
}, { timestamps: true})

const SurveyResponse = models?.SurveyResponse || model('SurveyResponse', surveyResponseSchema)

export default SurveyResponse