import { Router } from 'express';
import mongoose from 'mongoose';
import  { TicketModel } from '../../database/models/ticket.model';

export const ticketsController = Router();

// Create ticket
ticketsController.post('/create', async (req, res) => {

    const newTicket = new TicketModel({
        id: new mongoose.Types.ObjectId,
        title: req.body.title,
    });
});

// Get tickets by status
ticketsController.get('/:status', async (req, res) => {
    const ticketStatus = req.params.status;

    try {
        const tickets = await TicketModel.find({ status: ticketStatus });
        return res.status(200).json(tickets);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

