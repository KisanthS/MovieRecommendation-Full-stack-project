import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Watchlist.css';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(storedWatchlist);
    }, []);

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const handleRemove = (movieId) => {
        const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        setWatchlist(updatedWatchlist);
    };

    return (
        <div className="watchlist-container">
            <h1>Your Watchlist</h1>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                <div className="watchlist-movie-list">
                    {watchlist.map((movie) => (
                        <div key={movie.id} className="watchlist-movie-item">
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder-image-url.png'}
                                alt={movie.title}
                                className="watchlist-movie-image"
                                onClick={() => handleMovieClick(movie.id)}
                                style={{ cursor: 'pointer' }}
                            />
                            <div className="watchlist-movie-info">
                                <h3 onClick={() => handleMovieClick(movie.id)} style={{ cursor: 'pointer' }}>{movie.title}</h3>
                                <p>Release Date: {movie.release_date}</p>
                                <button onClick={() => handleRemove(movie.id)}>Remove from Watchlist</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
