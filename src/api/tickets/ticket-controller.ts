import { Router } from 'express';
import mongoose from 'mongoose';
import  { TicketModel } from '../../database/models/ticket.model';

export const ticketsController = Router();

// Create ticket
ticketsController.post('/create', async (req, res) => {

    const newTicket = new TicketModel({
        id: new mongoose.Types.ObjectId,
        title: req.body.title,
        projectId: req.body.projectId,
        assignedTo: req.body.assignedTo,
        description: req.body.description,
        status: req.body.status
    });

    const validation = newTicket.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    if (!newTicket.assignedTo && newTicket.status !== "open") {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        await newTicket.save();
        return res.status(201).json(newTicket);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// Get tickets by status
ticketsController.get('/getByStatus/:status', async (req, res) => {
    try {
        const tickets = await TicketModel.find({ status: req.params.status });
        return res.status(200).json(tickets);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Get all tickets
ticketsController.get('/', async (req, res) => {
    try {
        const tickets = TicketModel.find();
        return res.status(200).json(tickets);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Delete ticket by id
ticketsController.delete('/deleteById/:id', async (req, res) => {
    try {
        const deletedTicket = TicketModel.findByIdAndDelete(req.params.id);
        return res.status(200).json(deletedTicket);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

ticketsController.patch('/updateStatusById/:id', async (req, res) => {
    try {
        const updateTicket = await TicketModel.findByIdAndUpdate(req.params.id,
            { $set: { status: req.body.status, updateDate: new Date() }});
            return res.status(200).json(updateTicket);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
})

