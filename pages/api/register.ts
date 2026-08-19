import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../lib/prismadb';

// This is an API route handler for user registration. It handles POST requests to register a new user by checking if the email is already in use, hashing the password, and creating a new user record in the database.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is POST. If not, return a 405 Method Not Allowed response.
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }
    
    try {
        //get the name, email, and password from the request body. These values are expected to be sent in the POST request when a user attempts to register.
        const { name, email, password } = req.body;

        //Check if a user with the provided email already exists in the mongoDB. If a user is found, return a 420 response indicating that the email is already in use.
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(420).json({ error: 'Email already in use' });
        }

        // Hash the password using bcrypt with a salt round of 12. This ensures that the password is securely stored in the database.
        const hashedPassword = await bcrypt.hash(password, 12);

        //Create a new user in the database with the provided name, email, and hashed password. The image is set to an empty string, and emailVerified is set to the current date.
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            },
        });
            return res.status(200).json(user);
    } 
       catch (error) {
        console.log(error);
        return res.status(400).end();
        } 
}