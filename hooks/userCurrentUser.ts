import useSWR from "swr";
import fetcher from "../lib/fetcher";

// Hook to fetch the current user's information
// will be used in the components to get the current user data
const useCurrentUser = () => {
    const {data, error , isLoading, mutate} = useSWR("/api/current", fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
    };  
    export default useCurrentUser;