import {NextPageContext} from "next";
import { getSession,signOut } from "next-auth/react";
import Navbar from "./components/Navbar";
import Billboard from "./components/Billboard";
import MovieList from "./components/MovieList";
import useMovieList from "../hooks/useMovieList";
import useFavorites from "../hooks/useFavorites";


// Server-side function to check if the user is authenticated 
export async function getServerSideProps(context: NextPageContext) {
const session = await getSession(context);


// if the user is not authenticated, redirect them to the login page
if (!session) {
    return {
        redirect: {destination: "/auth", permanent: false}
    }
  }

  return {
    props: {}
  }

}

// Functional component for the home page
export default function Home(){
  const {data: movies = []} = useMovieList(); // Fetch movie data using the custom hook
  const {data: favorites = []} = useFavorites(); // Fetch favorite movie data using the custom hook 
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Popular on Netflix" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}