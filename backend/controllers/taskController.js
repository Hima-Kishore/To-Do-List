import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getTasks = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.user.userId
            },
            orderBy: {
                id: 'desc' 
            }
        })
        res.status(200).json(todos);
    } catch (error) {
       
        console.error("GET Error:", error); 
        res.status(500).json({ error: 'Internal Server Issue' });
    }
};

export const createTask = async (req, res) => {
    try {
        const { task, priority } = req.body;

        const newTodo = await prisma.todo.create({
            data: {
                task: task,
                priority: priority,
                userId: req.user.userId
            }
        });

        res.status(200).json(newTodo);
    } catch(error) {
        console.error("POST Error:", error);
        res.status(500).json({ error: "Unable to create task" });
    }
}

export const updateTask = async (req, res) => {
    const id = parseInt(req.params.id);
    const { task, priority, isCompleted } = req.body;
    try {
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
}

export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
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
}