import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


type MovieListProps = {
  id: string;
  title: string;
  poster_path: string;
};

export default function Home() {
  const [moviesList, setMoviesList] = useState<MovieListProps[]>([]);
  const IMAGE_PATH = process.env.NEXT_PUBLIC_API_IMAGE_PATH;
  const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  useEffect(() => {
    const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
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
      setMoviesList(json.results);
    })
    .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col">
      <h1 className="font-bold text-2xl text-center my-16">
        Popular Movies Today
      </h1>
      <div className="grid grid-cols-3 gap-4 w-full max-w-screen-lg mx-auto mb-16">
        {moviesList.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="border rounded-lg p-4 hover:bg-gray-50 flex flex-col items-center gap-4"
          >
            <Image
              src={`${IMAGE_PATH}${movie.poster_path}`}
              alt=""
              width={1080}
              height={1920}
              className="w-40"
            />
            <p className="text-center">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>

  );
}
