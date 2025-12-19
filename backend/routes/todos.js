import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth.js';
import { getTasks, createTask, updateTask, deleteTask} from '../controllers/taskController.js';


const prisma = new PrismaClient();
const router = express.Router();

// GET TASKS
router.get('/', auth, getTasks);

// CREATE TASK
router.post('/', auth, createTask);

//PATCH TASK
router.patch('/:id', auth, updateTask);

// DELETE TASK
router.delete('/:id', auth, deleteTask);

export default router;