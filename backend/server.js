import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {PrismaClient} from '@prisma/client';

const port = process.env.PORT || 8000;

import auth from './routes/auth.js';
import todos from './routes/todos.js';



const app = express();
const prisma = new PrismaClient();

app.use(cors({
    origin: [
        'http://localhost:8000', 
        'http://127.0.0.1:5500',
        'https://to-do-list-nu-puce.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.use(express.json());
app.use(cookieParser());

//routesHandler
app.use('/auth', auth)
app.use('/todos', todos);





app.listen(port, () => console.log(`Server is running ${port}`));

