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