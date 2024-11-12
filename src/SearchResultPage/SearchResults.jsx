import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './SearchResults.css';

const API_KEY = "5c49b6e2a36066a5b1491648804ef4c1";

const genreMap = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    Thriller: 53,
    Crime: 80,
    Romance: 10749,
};

const languageMap = {
    English: 'en',
    Hindi: 'hi',
    Bengali: 'bn',
    Telugu: 'te',
    Marathi: 'mr',
    Tamil: 'ta',
    Urdu: 'ur',
    Gujarati: 'gu',
    Malayalam: 'ml',
    Kannada: 'kn',
    Punjabi: 'pa',
    Assamese: 'as',
    Nepali: 'ne',
    Thai: 'th',
    Chinese: 'zh',
    Japanese: 'ja',
    Korean: 'ko',
    Vietnamese: 'vi',
    French: 'fr',
    German: 'de',
    Spanish: 'es',
    Russian: 'ru',
    Italian: 'it',
};

const yearMap = Array.from({ length: 21 }, (_, i) => 2000 + i); // Generates years from 2000 to 2020

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const searchQueryParam = queryParams.get('query') || "";

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState(null);
    const [language, setLanguage] = useState(null);
    const [year, setYear] = useState(null);
    const [searchQuery, setSearchQuery] = useState(searchQueryParam);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        let allMovies = [];

        try {
            if (genre) {
                for (let page = 1; page <= 5; page++) {
                    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}`;
                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Failed to fetch movies for this genre.');
                    const data = await response.json();
                    allMovies = [...allMovies, ...data.results];
                }
            } else {
                const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch movies for the search query.');
                const data = await response.json();
                allMovies = data.results || [];
            }

            setMovies(allMovies);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [searchQuery, genre]);

    const handleGenreClick = (selectedGenre) => {
        setGenre(genre === genreMap[selectedGenre] ? null : genreMap[selectedGenre]);
    };

    const clearFilters = () => {
        setGenre(null);
        setLanguage(null);
        setYear(null);
        setSearchQuery(searchQueryParam);
    };

    const applyFilters = () => {
        let filteredMovies = movies;

        if (language) {
            filteredMovies = filteredMovies.filter(movie => movie.original_language === language);
        }

        if (year) {
            filteredMovies = filteredMovies.filter(movie => new Date(movie.release_date).getFullYear() === Number(year));
        }

        return filteredMovies;
    };

    const filteredMovies = applyFilters();

    const handleMovieClick = (movie) => {
        navigate(`/movie/${movie.id}`); // Navigate to the correct route
    };    

    return (
        <div className="search-results-container">
            <h1 className="search-results-title">
                Search Results for <span className="search-results-keyword">"{searchQuery || 'All Movies'}"</span>
            </h1>

            {/* Filter Buttons and Search Bar */}
            <div className="search-results-filter-bar">
                {Object.keys(genreMap).map((genreName) => (
                    <button
                        key={genreName}
                        onClick={() => handleGenreClick(genreName)}
                        className={`search-results-filter-button ${genre === genreMap[genreName] ? 'active' : ''}`}
                    >
                        {genreName}
                    </button>
                ))}

                <div className="search-results-language-dropdown">
                    <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                        <option value="">Select Language</option>
                        {Object.keys(languageMap).map((langName) => (
                            <option key={langName} value={languageMap[langName]}>
                                {langName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="search-results-year-dropdown">
                    <select onChange={(e) => setYear(e.target.value)} value={year}>
                        <option value="">Select Year</option>
                        {yearMap.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="search-results-search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={fetchMovies}>Search</button>
                </div>

                <button onClick={clearFilters} className="clear-filters-button">
                    Clear All Filters
                </button>
            </div>

            {/* Movie Results */}
            {loading ? (
                <p className="search-results-loading">Loading movies, please wait...</p>
            ) : error ? (
                <p className="search-results-error">{error}</p>
            ) : (
                <div className="search-results-list">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="search-results-movie-card"
                                onClick={() => handleMovieClick(movie)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder-image-url.png'}
                                    alt={movie.title}
                                    className="search-results-movie-image"
                                />
                                <h3 className="search-results-movie-title">{movie.title}</h3>
                                <p className="search-results-movie-rating">Rating: {movie.vote_average}</p>
                            </div>
                        ))
                    ) : (
                        <p className="search-results-no-results">No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;