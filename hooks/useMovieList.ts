import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const useMovieList = () => {
    // Use the SWR hook to fetch movie data from the API endpoint
    const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
        // Disable automatic revalidation to prevent unnecessary API calls
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    // Return the data, error, and loading state from the SWR hook
    return {
        data,
        error,
        isLoading
    }
};

export default useMovieList;