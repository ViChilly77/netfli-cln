import {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth/next';
import prismadb from '../lib/prismadb';
import {authOptions} from '../pages/api/auth/[...nextauth]';

export class AuthenticationError extends Error {
    constructor() {
        super('Not signed in');
        this.name = 'AuthenticationError';
    }
}

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is signed in
    if (!session?.user?.email) {
        throw new AuthenticationError();
    }

    // Check if the user exists in the database
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currentUser) {
        throw new AuthenticationError();
    }

    return {currentUser};
}

export default serverAuth;


