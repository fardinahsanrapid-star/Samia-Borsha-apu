const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Frontend files serve korar jonno

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// Project Schema & Model
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    image: String,
    link: String
});
const Project = mongoose.model('Project', projectSchema);

// Routes
// 1. Get all projects
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// 3. Delete a project by ID
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});

// 2. Add a project (Postman diye test korar jonno)
app.post('/api/projects', async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json({ message: "Project added successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));