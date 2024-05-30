import { MovieSearch } from "~/utils/types"
import { Link } from "@remix-run/react"

interface MovieCardProps {
    movie: MovieSearch,
}

export default function MovieCard({ movie }: MovieCardProps) {
    return <Link target="_blank" to={`/movie/${movie.imdbID}`} className="flex flex-col justify-start items-center gap-y-4 border-[1px] border-slate-300 rounded-md transition-all cursor-pointer hover:scale-105">
        <img className="w-full h-full" src={movie.Poster} alt={movie.Title} />
        <div className="w-full flex flex-row justify-between items-center p-4">
            <div className="text-[14px] text-slate-600 font-semibold">{movie.Title}</div>
            <div className="text-[14px] text-blue-500 font-semibold">{movie.Year}</div>
        </div>
    </Link>
}