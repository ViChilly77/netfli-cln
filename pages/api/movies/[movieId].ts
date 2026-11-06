import {NextApiRequest, NextApiResponse} from "next";
import prismadb from "../../../lib/prismadb";
import serverAuth from "../../../lib/serverAuth";

// This API route retrieves a specific movie by its ID. It extracts the `movieId` from the request query parameters, 
// then queries the database for a movie with that ID. If found, it returns the movie in the response. 
// If any errors occur during this process, it logs the error and returns a 400 status code.    
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
        }
    
    try {
        await serverAuth(req, res); // Authenticate the user
        const { movieId } = req.query;

        if (typeof movieId !== 'string') {
            throw new Error('Invalid ID');
        }

        if (!movieId) {
            throw new Error('Invalid ID');
        }
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });
        if (!movie) {
            throw new Error('Movie not found');
        }
        return res.status(200).json(movie);
    }
    catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}