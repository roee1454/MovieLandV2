import axios from "axios";

const BASE_URL = "http://www.omdbapi.com/?apikey=cd1701ad";


export const getMovies = async (query: string) => {
    const response = await axios.get(`${BASE_URL}${query ? query : ""}`)
    if (response.status !== 200) {
        throw new Error("Invalid Query");
    }
    const { data, status }= response;
    return { data, status };
}


export const getMovie = async (imdbId: string) => {
    const response =  await axios.get(`${BASE_URL}&i=${imdbId}`);
    if (response.status !== 200) {
        throw new Error("Invalid Query");
    }
    const { data, status } = response;
    return { data, status };
}