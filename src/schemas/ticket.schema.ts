import { Schema } from 'mongoose';

export const TicketSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    projectId: {
        type: Schema.Types.String,
        required: true,
    },
    assignedTo: {
        type: Schema.Types.String,
        required: false,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    createDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ['open', 'in progress', 'resolved'],
    }
});