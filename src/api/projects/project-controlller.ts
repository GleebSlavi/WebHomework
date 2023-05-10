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
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

// Get all projects
projectsController.get('/', async (req, res) => {
    try {
        const allProjects = await ProjectModel.find();
        return res.status(200).json(allProjects);
    } catch (err) {
        return res.status(404).json(err);
    }
});

// Get project by name
projectsController.get('/:projectName', async (req, res) => {
    const projName = req.params.projectName;

    const project = await ProjectModel.findOne({ projectName: projName });
    if (!project) {
        return res.status(404).json({ error: 'No such project' });
    }

    return res.status(200).json(project.toJSON());
});

// Get projects by status
projectsController.get('/:status', async (req, res) => {
    const projectStatus = req.params.status;

    try {
        const projects = await ProjectModel.find({ status: projectStatus });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
})

// Update project status by name
projectsController.patch('/status/:projectName', async (req, res) => {
    const projName = req.params.projectName;
    
    try {
        const updatedProject = await ProjectModel.updateOne({ projectName: projName }, 
            { $set: { status: req.body.status } });
        return res.status(200).json(updatedProject); 
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Delete a project by name
projectsController.delete('/:projectName', async (req, res) => {
    const projName = req.params.projectName;

    try {
        const deletedProject = await ProjectModel.findOneAndDelete({ projectName: projName });
        return res.status(200).json(deletedProject);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
})