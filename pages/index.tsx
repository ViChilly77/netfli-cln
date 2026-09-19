import {NextPageContext} from "next";
import { getSession,signOut } from "next-auth/react";
import Navbar from "./components/Navbar";


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
    
  return (
    <>
      <Navbar />
    </>
  )
}