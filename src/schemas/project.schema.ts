import { Schema } from "mongoose";

export const ProjectSchema = new Schema({
    id: Schema.Types.ObjectId,
    projectName: {
        type: Schema.Types.String,
        required: true,
    },
    startDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ['in progress', 'done'],
    }
});