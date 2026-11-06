import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import useMovieList from "../../hooks/useMovieList";
import MovieCard from "./MovieCard";


// Props for the Search component
interface SearchProps {
    visible: boolean;
    onClose: () => void;
}

// Search component for searching movies
const Search: React.FC<SearchProps> = ({ visible, onClose }) => {
    
    const [query, setQuery] = useState("");
    const { data: movies } = useMovieList();

    // Filter movies based on the search query
    const filteredMovies = movies?.filter((movie: any) =>
        movie.title.toLowerCase().includes(query.toLowerCase().trim())
    ) || [];

    // If the search modal is not visible, return null
    if (!visible) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 p-6 overflow-y-auto">
            <div className="flex items-center gap-4 border-b border-gray-600 pb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for movies..."
                    autoFocus
                    className="flex-1 bg-transparent text-white text-xl outline-none"
                />

                <button onClick={onClose}>
                    <BsX className="text-white" size={32} />
                </button>
            </div>

            // Display search results if the query is not empty
            {query.trim() !== "" && (
                <div className="mt-8">
                    <h2 className="text-white text-xl mb-6">
                        Search Results
                    </h2>

                    // Display filtered movies or a message if no movies are found
                    {filteredMovies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredMovies.map((movie: any) => (
                                <MovieCard key={movie.id} data={movie} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">
                            No movies found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;