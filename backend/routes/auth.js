import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if(!email || !password || !confirmPassword) return res.status(404).json("All fields are required!");
        
        if(password !== confirmPassword) return res.status(404).json("Passwords didn't match");
        
        const verifyMail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(verifyMail) return res.status(401).json("Email already exists, please login");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });
        const token = jwt.sign(
            { userId: user.id }, //payload
            process.env.JWT_SECRET, //the secret key
            { expiresIn: '7d' } //Expiration
        );

        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        };
        
        res.cookie('token', token, cookieOptions);
        
        res.status(201).json("User succefully created");
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
            { expiresIn: '7d' } //Expiration
        );

        const cookieOptions = {
            httpOnly: true,
            // secure: process.env.STATE === 'production',
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        };
        
        res.cookie('token', token, cookieOptions);

        res.status(201).json({ token: token });

    } catch (error) {
        res.status(504).json("Internal Server Error");
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(201).json("Logged out succesfuly");
});

export default router;