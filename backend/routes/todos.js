import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth.js';

// FIX 1: Spelled 'prisma' correctly
const prisma = new PrismaClient();
const router = express.Router();

// GET TASKS
router.get('/', auth, async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.user.userId
            },
            // Optional: Sort by newest first
            orderBy: {
                id: 'desc' 
            }
        })
        res.json(todos);
    } catch (error) {
        // FIX 2: Log the actual error to your VS Code terminal
        console.error("GET Error:", error); 
        // FIX 3: Changed 504 to 500 (500 = Internal Server Error, 504 = Timeout)
        res.status(500).json({ error: 'Internal Server Issue' });
    }
})

// CREATE TASK
router.post('/', auth, async (req, res) => {
    try {
        const { task, priority } = req.body;

        const newTodo = await prisma.todo.create({
            data: {
                task: task,
                priority: priority,
                userId: req.user.userId
            }
        });

        res.json(newTodo);
    } catch(error) {
        console.error("POST Error:", error);
        // FIX 4: Fixed 'ststus' typo
        res.status(500).json({ error: "Unable to create task" });
    }
})

//PATCH TASK
router.patch('/:id', auth, async (req, res) => {
    const taskId = req.params.id;
    const {task, priority, isCompleted} = req.body;

    const id=parseInt(taskId);

    if(isNaN(id)) {
        return res.status(400).json({error: "Invalid Task ID"});
    }
    try {
        // Check ownership logic (Optional but good)
        const existingTask = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });

        if(!existingTask) {
             return res.status(404).json({ error: "Task not found" });
        }

        if(existingTask.userId !== req.user.userId) {
            return res.status(403).json({ error: "Not authorized to modify this task" });
        }

        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                task: task!==undefined ? task : existingTask.task,
                priority: priority!==undefined ? priority : existingTask.priority,
                isCompleted: isCompleted!==undefined ? isCompleted : existingTask.isCompleted
            }
        });
        
        res.json(updatedTodo);

    } catch(error) {
        console.error("Error: Couldn't modify task", error);
        res.status(500).json({ error: "Unable to modify task" });
    }
})

// DELETE TASK
router.delete('/:id', auth, async(req, res) => {
    const taskId = req.params.id;
    try {
        // Check ownership logic (Optional but good)
        const task = await prisma.todo.findUnique({
            where: {
                id: parseInt(taskId)
            }
        });

        if(!task) {
             return res.status(404).json({ error: "Task not found" });
        }

        if(task.userId !== req.user.userId) {
            return res.status(403).json({ error: "Not authorized to delete this task" });
        }

        await prisma.todo.delete({
            where: {
                id: parseInt(taskId)
            }
        });
        
        res.json({ message: "Task deleted successfully" });

    } catch(error) {
        console.error("DELETE Error:", error);
        res.status(500).json({ error: "Unable to delete task" });
    }
})

export default router;