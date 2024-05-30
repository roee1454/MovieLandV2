import { type MetaFunction, type ClientLoaderFunctionArgs, useLoaderData } from '@remix-run/react'
import { getMovie } from '~/utils/instance';
import { StarIcon } from 'lucide-react';
import { Movie } from '~/utils/types';


export const meta: MetaFunction = () => [
    { title: "Movie Details" },
    { name: "Movie", "content": "movie" }
]


export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
    const { imdbID } = params;
    if (!imdbID) {
        throw new Error("No Movie Id Provided")
    }
    const { data, status } = await getMovie(imdbID);

    if (status !== 200) {
        throw new Error("Error While Fetching Movie")
    }

    return data as Movie;

}

clientLoader.hydrate = true;

export function HydrateFallback() {
    return <div>Loading Movie Details...</div>
}

export default function MovieDetailsPage() {
    const movie = useLoaderData<typeof clientLoader>()
    console.log(movie)
    return <div className='w-full h-[90vh] flex flex-row justify-between items-center px-6 md:px-24 gap-56'>
        <div className='flex flex-col justify-center items-center gap-5'>
            <div className='w-full h-full'><img draggable={"false"} className='rounded-md shadow-md pointer-events-none select-none' src={movie.Poster} alt={movie.Title} /></div>
            <div className='text-[20px] text-gray-800 text-opacity-70 font-bold'>{movie.Title}</div>
            <div className='w-full flex flex-row justify-between items-center'>
                <div>Release Date: {movie.Released}</div>
                <div className='flex flex-row justify-center items-center gap-1'>{movie.imdbRating}/10  <StarIcon className='m-2 w-5 h-5' /></div>
            </div>
        </div>
        <div className='h-full flex flex-col justify-center items-start gap-5'>
            <div className='text-[32px] text-gray-800 text-opacity-70 font-bold'>
                Plot Summary
            </div>
            <div>{movie.Plot}</div>
            <div className='text-[32px] text-gray-800 text-opacity-70 font-bold'>
                Actors:
            </div>
            <ul className='flex flex-col justify-center items-start list-disc px-6'>
                {movie.Actors.split(",").map(actor => <li>{actor}</li>)}
            </ul>
            <div className='text-[32px] text-gray-800 text-opacity-70 font-bold'>
                Genres:
            </div>
            <ul className='flex flex-col justify-center items-start list-disc px-6'>
                {movie.Genre.split(",").map(actor => <li>{actor}</li>)}
            </ul>
        </div>
    </div>
}