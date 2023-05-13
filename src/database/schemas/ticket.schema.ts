import { Schema } from 'mongoose';

export const TicketSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: {
        type: Schema.Types.String,
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        default: null,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    createDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    updateDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ['open', 'in progress', 'resolved'],
    }
});