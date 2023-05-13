import { Router } from 'express';
import mongoose from 'mongoose';
import { ProjectModel } from '../../database/models/project.model';

export const projectsController = Router();

// Create a project
projectsController.post('/create', async (req, res) => {

    const newProject = new ProjectModel({
        id: new mongoose.Types.ObjectId,
        projectName: req.body.projectName,
        description: req.body.description,
        status: req.body.status,
    });

    const validation = newProject.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    try {
        await newProject.save();
        return res.status(201).json(newProject);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// Get all projects
projectsController.get('/getAll', async (req, res) => {
    try {
        const allProjects = await ProjectModel.find();
        return res.status(200).json(allProjects);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Get project by name
projectsController.get('/getByName/:projectName', async (req, res) => {
    try {
        const project = await ProjectModel.findOne({ projectName: req.params.projectName });
        if (!project) {
            return res.status(404).json({ error: 'No such project' });
        }
        
        return res.status(200).json(project);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Get projects by status
projectsController.get('/getByStatus/:status', async (req, res) => {
    try {
        const projects = await ProjectModel.find({ status: req.params.status });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
})

// Update project status by name
projectsController.patch('/updateStatusByName/:projectName', async (req, res) => {
    try {
        const updatedProject = await ProjectModel.updateOne({ projectName: req.params.projectName }, 
            { $set: { status: req.body.status } });
        return res.status(200).json(updatedProject); 
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Delete a project by name
projectsController.delete('/deleteByName/:projectName', async (req, res) => {
    try {
        const deletedProject = await ProjectModel.findOneAndDelete({ projectName: req.params.projectName });
        return res.status(200).json(deletedProject);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
})