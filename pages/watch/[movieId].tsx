import React from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useMovie from "../../hooks/useMovie";

const Watch = () => {
    const router = useRouter();
    const movieId = router.query.movieId;
    const { data } = useMovie(typeof movieId === "string" ? movieId : undefined);

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <button
                    type="button"
                    onClick={() => router.back()}
                    aria-label="Go back"
                >
                    <AiOutlineArrowLeft className="text-white" size={40} />
                </button>
                <p className="text-white text-1xl md:text-3xl font-bold ">
                    <span className="font-light">
                        Watching:
                    </span>
                    {data?.title}
                </p>
                    
            </nav>
            <video
                className="h-full w-full"
                autoPlay
                playsInline
                controls
                src={data?.videoUrl}>
            </video>

        </div>
    )

}
export default Watch;
