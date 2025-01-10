// app/movie/[id]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
type Genre = {
    id: number;
    name: string;
};

interface MovieDetails {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    director: string;
    overview: string;
    genres: Genre[];
    poster_path: string;
}


const MovieDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
    const IMAGE_PATH = process.env.NEXT_PUBLIC_API_IMAGE_PATH;

    const [movieDetail, setMovieDetail] = useState<MovieDetails>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json !== undefined) {
                    setMovieDetail(json);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setLoading(false);
            });
    }, [id, token]);

    if (loading) return <div className="">Loading...</div>;

    console.log({ movieDetail });

    return (
        <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto pt-16">
            <div className="mb-6 flex items-start w-full">
                <Link
                    href="/"
                    className="bg-gray-100 px-2 py-1.5 rounded-lg text-sm hover:bg-gray-200 text-gray-800"
                >
                    ← back to movies
                </Link>
            </div>
            <div className="flex gap-4 border p-4 rounded-lg w-full">
                <Image
                    src={`${IMAGE_PATH}${movieDetail?.poster_path}`}
                    alt=""
                    width={1080}
                    height={1920}
                    className="w-52 rounded-md"
                />
                <div className="flex flex-col">
                    <h1 className="font-bold text-xl">{movieDetail?.title}</h1>

                    <div className="flex gap-2 mt-4 text-xs">
                        {movieDetail?.genres.map((genre: any) => (
                            <p key={genre.id}>{genre.name}</p>
                        ))}
                    </div>
                    <p className="mt-4 text-sm">{movieDetail?.releaseDate}</p>
                    <p>{movieDetail?.overview}</p>
                </div>
            </div>
        </div>
    );
}
export default MovieDetail;