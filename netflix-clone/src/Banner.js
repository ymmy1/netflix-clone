import React, { useEffect, useState } from 'react';
import axios from "./axios";
import requests from "./requests";
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length)
                ]
            );
            return request;
        }
        fetchData();
    }, []);
    function truncate(str, max) {
        return str?.length > max ? str.substr(0, max - 1) + '…' : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div>
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <div className="banner__description">
                    {truncate(movie?.overview, 150)}
                </div>
            </div>
            <div className="banner__fadeBottom"></div>
        </header>
    )
}

export default Banner
