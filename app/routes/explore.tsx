import { ClientLoaderFunctionArgs, MetaFunction, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import MovieCard from "~/components/MovieCard";
import { getMovies } from "~/utils/instance";
import { MovieSearch } from "~/utils/types";

export const meta: MetaFunction = () => {
    return [
        { title: "Explore New Movies" },
        { name: "Explore Page", content: "movies" }
    ]
};

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search")?.length! < 2  ? 'apes' : url.searchParams.get("search");
    const { data } = await getMovies(`&s=${searchQuery}`);
    return data.Search ? data.Search.toSorted((a: MovieSearch, b: MovieSearch) => parseInt(b.Year) - parseInt(a.Year)) as MovieSearch[] : [];
}

clientLoader.hydrate = true;

export function HydrateFallback() {
    return <p>Loading...</p>
}

export default function Explore() {
    const data = useLoaderData<typeof clientLoader>();
    const [query, setQuery] = useSearchParams({ search: "" });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(prev => {
            prev.set('search', e.target.value);
            return prev;
        }, { replace: true })
    }

    const [movies, setMovies] = useState(data);

    useEffect(() => {
        const fetchMovies = async () => {
            const searchQuery = query.get("search")?.length! < 2  ? 'apes' : query.get("search");
            const { data } = await getMovies(`&s=${searchQuery}`);
            const result = data.Search ? data.Search.toSorted((a: MovieSearch, b: MovieSearch) => parseInt(b.Year) - parseInt(a.Year)) : [];
            setMovies(result)
        }        
        fetchMovies()
    }, [query]) 

    return <div className="flex flex-col justify-center items-center gap-10 px-6 md:px-24 mt-12 py-6">
        <div className="w-full relative">
            <Search size={40} className="absolute p-2" />
            <input onChange={handleChange} className="w-full py-2 px-12 bg-gray-300 opacity-70 outline-none focus:outline-none rounded-md shadow-md" placeholder="Search for popular titles.." type="text" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center content-center gap-10 ">
            {movies.length > 0 ? movies.map((movie: MovieSearch, idx: number) => {
                return <MovieCard key={idx} movie={movie} />
            }) : (
                <div className="w-full col-span-2 md:col-span-4 text-center text-gray-800 text-[20px] text-opacity-70">No titles were found for search: "{query.get("search")}"</div>
            )}
        </div>
    </div>
}