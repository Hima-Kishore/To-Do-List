import express from 'express';

import auth from '../middleware/auth.js';

router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.user.userId
            }
        })
        res.json(todos);
    } catch (error) {
        res.status(504).json('Internal Server Issue');
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const { task, priority} = req.body;

        const newTodo = await prisma.todo.create({
            data: {
                task: task,
                priority: priority,
                userId: req.user.userId
            }
        });

        res.json(newTodo);
    } catch(error) {
        res.ststus(504).json("Unable to create task");
    }
})

router.delete('/:id', auth, async(req, res) => {
    const taskId = req.params.id;
    try {
        const task = await prisma.todo.findUnique({
            where: {
                id: parseInt(taskId)
            }
        });
        if(!task || task.userId !== req.user.userId) return res.status(404).json("Task not available");
        else {
            const deletedTask = await prisma.todo.delete({
                where: {
                    id: parseInt(taskId)
                }
            });
        }
        
        res.json("Task deleted successfully");
    } catch(error) {
        res.status(504).json("Unable to delete task");
    }
})



export default router;