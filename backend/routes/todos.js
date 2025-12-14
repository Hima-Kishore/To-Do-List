import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth.js';
import { getTasks, createTask, updateTask, deleteTask} from '../controllers/taskController.js';


const prisma = new PrismaClient();
const router = express.Router();

// GET TASKS
router.get('/', auth, async (req, res) => {
    
})

// CREATE TASK
router.post('/', auth, async (req, res) => {
    
})

//PATCH TASK
router.patch('/:id', auth, async (req, res) => {
    const taskId = req.params.id;
    const {task, priority, isCompleted} = req.body;

    const id=parseInt(taskId);

    if(isNaN(id)) {
        return res.status(400).json({error: "Invalid Task ID"});
    }
    
})

// DELETE TASK
router.delete('/:id', auth, async(req, res) => {
    const taskId = req.params.id;
    
})

export default router;