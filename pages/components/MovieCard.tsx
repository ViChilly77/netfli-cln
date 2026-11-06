import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import { useState } from "react";
import MovieInfoModal from "./MovieInfoModal";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }: MovieCardProps) => {
    const router = useRouter();
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    return (
        <>
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <img src={data.thumbnailUrl} alt="Thumbnail" draggable={false} 
            className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]" />
            <button
                type="button"
                onClick={() => setIsInfoOpen(true)}
                aria-label={`More information about ${data.title}`}
                className="absolute right-1 top-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white sm:hidden"
            >
                <AiOutlineInfoCircle size={20} />
            </button>
            
            <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
                <img src={data.thumbnailUrl} alt="Thumbnail" draggable={false} 
                className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]" />
                <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                    <div className="flex flex-row items-center gap-3">
                        <div className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                        onClick={() => router.push(`/watch/${data?.id}`)}>
                            <BsFillPlayFill size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id} />
                        <button
                            type="button"
                            onClick={() => setIsInfoOpen(true)}
                            aria-label={`More information about ${data.title}`}
                            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center text-white transition hover:border-neutral-300"
                        >
                            <AiOutlineInfoCircle size={22} />
                        </button>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2026</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
        <MovieInfoModal movie={isInfoOpen ? data : null} onClose={() => setIsInfoOpen(false)} />
        </>
    )
}
export default MovieCard;