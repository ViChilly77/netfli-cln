import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prismadb from '../../../lib/prismadb';
import { compare } from 'bcrypt';

// NextAuth configuration for authentication using credentials provider
export default NextAuth({
    providers: [
        // Configure the credentials provider for email and password authentication
        Credentials(
            {
                id: 'credentials',
                name: 'Credentials',
                credentials: {
                    email: {
                        label: 'Email',
                        type: 'text'
                    },
                    password: {
                        label: 'Password',
                        type: 'password'
                    }
                },
                // The authorize function is called when a user attempts to log in with credentials
                //async is used to handle asynchronous operations, such as database queries and password comparison
                async authorize(credentials) {
                    // Implement your authorization logic here
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Email and password are required');
                    }

                    const user = await prismadb.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });

                    if (!user || !user.hashedPassword ) {
                        throw new Error('Email does not exist or user has no password');
                    }

                    const isCorrectPassword = await compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    if (!isCorrectPassword) {
                        throw new Error('Incorrect password');
                    }

                    return user; // Return the user object if authorized, otherwise return null
                }
            }
        )
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
})
