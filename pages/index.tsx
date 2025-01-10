'use client'
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");


export default function Home() {
  const [moviesList, setmoviesList] = useState();
  const IMAGE_PATH =process.env.NEXT_PUBLIC_API_IMAGE_PATH;
  useEffect(()=>{
    const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + '/3/movie/popular';
    const fetchMoviesList = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      }

      fetch(url, options).then((res) => res.json()).then((data) => setmoviesList(data.result)).catch((err) => {
        console.error(err, "Failed to fecth list")
      })
    }
    fetchMoviesList()

  },[])

  return (
    <div>
      <div>
        <h1>Popular Movie of the Day</h1>
        <div>
          {moviesList.map((movie:any)=>{
            <Link href={''} key={movie.id}>
            <Image 
            src={`${IMAGE_PATH}`+`${movie.poster_path}`}
            alt='poster'
            width={1080}
            height={1920}/>
            <p> {movie.title}</p>
            </Link>
          })}
        </div>
      </div>
    </div>
   
  );
}
