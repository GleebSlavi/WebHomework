import { Router } from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../../database/models/user.model';
import { hashSync, genSaltSync } from 'bcrypt';

export const usersController = Router();

// Create user
usersController.post('/create', async (req, res) => {

    const newUser = new UserModel({
        id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashSync(req.body.password, genSaltSync()),
        username: req.body.username,
    });


    const validation = newUser.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    try {
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// Get user by username
usersController.get('/getByUsername/:username', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'No such user'} );
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error });
    }

})

// Get all users
usersController.get('/', async (req, res) => {
    try {
        const allUsers = await UserModel.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(404).json({ message: error })
    }
});

// Delete user by username
usersController.delete('/deleteByUsername/:username', async (req, res) => {
    try {
        const deletedUser = await UserModel.findOneAndDelete({ username: req.params.username });
        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Change password by username
usersController.patch('/updatePasswordByUsername/:username', async (req, res) => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ username: req.params.username },
            { $set: { password: hashSync(req.body.password, genSaltSync()) } });
            return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

