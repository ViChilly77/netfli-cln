import {NextPageContext} from "next";
import { getSession,signOut } from "next-auth/react";
import userCurrentUser from "../hooks/userCurrentUser";

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
   const { data: user } =  userCurrentUser();
    
  return (
    <>
      <h1 className="text-4xl text-red-500">NetCLone</h1>
      <p className ="text-white">Logged in as {user?.name}.</p>
      <button className="bg-red-500 text-white px-4 py-2 w-1/2 rounded-md mt-4 " onClick={() => signOut()} >
        Sign Out
      </button>
    </>
  )
}