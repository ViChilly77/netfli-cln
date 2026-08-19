import { useCallback, useState } from "react";
import Input from "./components/input";
import axios from "axios";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [variant, setVariant] = useState("login");
    // useCallback is a React hook that memoizes a function, preventing it from being recreated on every render unless its dependencies change. This can improve performance by avoiding unnecessary re-renders of child components that rely on this function.
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === "login" ? "register" : "login");
    }, []);

    
    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });
        } 
        catch (error) {
            console.log(error);
        }
        //all the dependencies of the register function are included in the dependency array, which means that the function will be recreated whenever any of these values change. This ensures that the function always has access to the latest values of name, email, and password when it is called.
    }, [name, email, password]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src= "/images/logo.png" alt="Logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "login" ? "Sign in" : "Register"} 
                        </h2>
                        <div className="flex flex-col gap-4">
                            
                            {variant === "register" && (
                            /* Import Input component */
                            <Input 
                                // passing props to the Input component to customize its behavior and appearance. These props include id, label, type, value, and onChange handler.
                                
                                id="name"
                                onChange={(ev: any) => setName(ev.target.value)}
                                label="Username"
                                value={name}
                            />)}

                            <Input
                                id="email"
                                onChange={(ev: any) => setEmail(ev.target.value)}
                                label="Email"
                                type="email"
                                value={email}
                            />
                            <Input
                                id="password"
                                onChange={(ev: any) => setPassword(ev.target.value)}
                                label="Password"
                                type="password"
                                value={password}
                            />
                        </div>
                        
                        <button onClick={register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === "login" ? "Login" : "Sign up"}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "New to Netflix?" : "Already have an account?"}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === "login" ? "Create an account" : "Login"} 
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth; 