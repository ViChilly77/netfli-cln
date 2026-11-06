import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface MovieInfo {
    id?: string;
    title?: string;
    description?: string;
    thumbnailUrl?: string;
    genre?: string;
    duration?: string;
}

interface MovieInfoModalProps {
    movie: MovieInfo | null;
    onClose: () => void;
}

const MovieInfoModal: React.FC<MovieInfoModalProps> = ({ movie, onClose }) => {
    const router = useRouter();

    useEffect(() => {
        if (!movie) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [movie, onClose]);

    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
            <button
                type="button"
                aria-label="Close movie details"
                className="fixed inset-0 bg-black/80"
                onClick={onClose}
            />
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="movie-info-title"
                className="relative z-10 my-auto w-full max-w-2xl overflow-hidden rounded-md bg-zinc-900 text-white shadow-xl"
            >
                <div className="relative">
                    {movie.thumbnailUrl && (
                        <img
                            src={movie.thumbnailUrl}
                            alt=""
                            className="max-h-[50vh] w-full object-cover"
                        />
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close movie details"
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 hover:bg-black"
                    >
                        <AiOutlineClose size={22} />
                    </button>
                </div>
                <div className="space-y-4 p-5 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 id="movie-info-title" className="text-2xl font-bold md:text-3xl">
                            {movie.title}
                        </h2>
                        {movie.id && (
                            <button
                                type="button"
                                onClick={() => router.push(`/watch/${movie.id}`)}
                                className="flex items-center rounded-md bg-white px-4 py-2 font-semibold text-black transition hover:bg-neutral-300"
                            >
                                <BsFillPlayFill className="mr-1" size={22} />
                                Play
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-300">
                        {movie.duration && <span>{movie.duration}</span>}
                        {movie.genre && <span>{movie.genre}</span>}
                    </div>
                    {movie.description && (
                        <p className="leading-relaxed text-neutral-200">{movie.description}</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MovieInfoModal;
