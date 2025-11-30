import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';

router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        
        const verifyMail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(verifyMail) return res.status(400).json("Email already exists, please login");
        if(password !== confirmPassword) return res.status(404).json("Passwords didn't match");

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });

        res.status(201).json("User Created Successfully");

    } catch(error) {
        res.status(504).json("Internal Server Error");
    }
})

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user) return res.status(404).json("Email and Password didn't match");

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) return res.status(404).json("Email and Password didn't match");

        const token = jwt.sign(
            { userId: user.id }, //payload
            process.env.JWT_SECRET, //the secret key
            { expiresIn: '4hr' } //Expiration
        )
        res.json({ token: token });
        
    } catch (error) {
        res.status(504).json("Internal Server Error");
    }
})

export default router;