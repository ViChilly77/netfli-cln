import {NextApiRequest} from 'next';
import {getSession} from 'next-auth/react';
import prismadb from '../lib/prismadb';

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({req});

    // Check if the user is signed in
    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    // Check if the user exists in the database
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return {currentUser};
}

export default serverAuth;



