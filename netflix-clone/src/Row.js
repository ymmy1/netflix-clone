import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // something idk what
    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        heigth: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || movie?.original_title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));

                }).catch((error) => {
                    console.log(error);
                    alert("There is no movie trailer for this movie on YouTube :( Try other!")
                })
        }
    }
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>

            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__poster-large"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie?.backdrop_path || movie.poster_path}`} alt={movie?.title || movie?.name || movie?.original_name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
