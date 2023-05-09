import { Router } from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../../database/models/user.model';

export const usersController = Router();

// Create user
usersController.post('/create', async (req, res) => {

    const newUser = new UserModel({
        id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    });

    console.log(newUser);

    const validation = newUser.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    console.log(newUser);

    try {
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

// Get user by username
usersController.get('/:username', async (req, res) => {
    const userUsername = req.params.username;

    const user = await UserModel.findOne({ username: userUsername });
    if (!user) {
        return res.status(404).json({ error: 'No such user'} );
    }

    return res.status(200).json(user.toJSON());
})

// Get all users
usersController.get('/', async (req, res) => {
    try {
        const allUsers = await UserModel.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(404).json({ message: error })
    }
})