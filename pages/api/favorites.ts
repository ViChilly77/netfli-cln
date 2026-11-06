import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";
import serverAuth from "../../lib/serverAuth";

// This API route retrieves a user's list of favorite movies. It first authenticates the user using the `serverAuth` function, 
// then queries the database for movies whose IDs match those in the user's `favoriteIds` array.
//  The route returns the list of favorite movies in the response. If any errors occur during this process, it logs the error and returns a 400 status code.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { currentUser } = await serverAuth(req, res); 
        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        });
        return res.status(200).json(favoriteMovies);
       
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}