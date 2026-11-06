import { NextApiRequest, NextApiResponse } from "next";
import {without} from "lodash";
import prismadb from '../../lib/prismadb';
import serverAuth, {AuthenticationError} from '../../lib/serverAuth';

// This API route handles adding and removing movies from a user's list of favorite movies. It supports two HTTP methods: 
// POST for adding a movie to favorites and DELETE for removing a movie from favorites. The route first authenticates the 
// user using the `serverAuth` function, then checks if the specified movie exists in the database. 
// If the movie exists, it updates the user's favorite movie IDs accordingly and returns the updated user data. If any errors occur during this process, it logs the error and returns a 400 status code.

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    console.log("FAV API HIT:", req.method);
    try{
        if(req.method === "POST"){
            const {currentUser} = await serverAuth(req, res);
            const {movieId} = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });
            if(!existingMovie){
                throw new Error("Invalid ID");
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ""
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            });

            res.status(200).json(user);
            return;
        }

        if(req.method === "DELETE"){
            const {currentUser} = await serverAuth(req, res);
            const {movieId} = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });
            if(!existingMovie){
                throw new Error("Invalid ID");
            }

            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || ""
                },
                data: {
                    favoriteIds: updatedFavoriteIds
                }
            });
            res.status(200).json(updatedUser);
            return;
            }
            res.status(405).end();
        }catch (error) {
           console.error(error);
           res.status(error instanceof AuthenticationError ? 401 : 400).end();
    }
}