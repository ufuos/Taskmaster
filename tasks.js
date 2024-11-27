const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
//const {createTask, getTasks} = require('../controllers/taskController');

//Create a Task
router.post('/', authMiddleware, async (req, res) => {
    try{
        const {title, description,deadline, priority} = req.body;
        const task = new Task({user: req.user._id, title, description, deadline, priority});
        await task.save();
        res.status(201).json(task);
    }
    catch(err) {
        res.status(400).json({message: err . message});
    }
});

//update a Task
router.put('/:id', authMiddleware, async(req, res) => {
    try{
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id, user: req.user._id},
            req.body,
            {mew: true}
        );
        if(!task) throw new Error('Task not found');

        res.status(200).json(task);
    }
    catch(err){
        res,status(404).json({message:err.message});
    }
});
//Delete a Task
router.delete('/:id', authMiddleware,async(req, res) => {
    try{
    const task = await Task.findOneAndDelete({_id: req.params.id, user: req.user._id});
    if(!task) throw new Error('Task not found');
    res.status(200).json({message: 'Task deleted successfully'});
}
catch (err){
res.status(404).json({message: err.message});
}
});
// Get all Task
router.get('/', authMiddleware, async(req, res) => {
    try{
        const {priority, completed} = req.query;
        const filters = {user: req.user._id};

        if(priority) filters.priority = priority;
        if(completed !== undefined) filters.completed = completed === 'true';

        const tasks = await Task.find(filters);
        res.status(200).json(task);
    }
    catch (err) {
        res,status(400).json({message: err.message});
    }
});
module.exports = router;



//router.post('/tasks', auth, createTask);
//router.get('/tasks', auth, getTasks);

module.exports = router;