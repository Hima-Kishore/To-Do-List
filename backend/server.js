import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';

const port = process.env.PORT || 7000;

import auth from './routes/auth.js';
import todos from './routes/todos.js';


const users = [
    {
        'name': 'Kishore',
        'age': 23
    },
    {
        'name': 'Euru',
        'age': 25
    },
    {
        'name': 'Jaya',
        'age': 42
    },
    {
        'name': 'Ravi',
        'age': 50
    }
]

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

//routesHandler
app.use('/auth', auth)
app.use('/todos', todos);





app.listen(port, () => console.log(`Server is running ${port}`));

