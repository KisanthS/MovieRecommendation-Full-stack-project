import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './Homepage.css';

const Homepage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const carouselRef = useRef(null);
    const [activeTab, setActiveTab] = useState('day');
    const [topMoviesDay, setTopMoviesDay] = useState([]);
    const [topMoviesMonth, setTopMoviesMonth] = useState([]);
    const [topMoviesYear, setTopMoviesYear] = useState([]);
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(""); // Error state

    const apiKey = '5c49b6e2a36066a5b1491648804ef4c1';

    const fetchMoviesData = async () => {
        setLoading(true); // Start loading
        setError(""); // Reset error state
        try {
            const [responseDay, responseMonth, responseYear, responseFeatured] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`),
                axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`),
                axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=2`),
                axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
            ]);

            setTopMoviesDay(responseDay.data.results.slice(0, 10));
            setTopMoviesMonth(responseMonth.data.results.slice(10, 20));
            setTopMoviesYear(responseYear.data.results.slice(0, 10));
            setFeaturedMovies(responseFeatured.data.results.slice(0, 10));
        } catch (error) {
            setError("Error fetching movie data. Please try again later."); // Set error message
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchMoviesData(); // Fetch movie data on component mount
    }, []);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: 220, behavior: 'smooth' });
                if (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
            }
        }, 3000);

        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <div className="homepage-container">
            {/* Navigation Bar */}
            <nav className="navbar-container">
                <div className="navbar-logo">MovieFinder</div>
                <div className="navbar-search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Link to={`/search?query=${encodeURIComponent(searchQuery)}`} className="search-button">
                        Search
                    </Link>
                </div>
                <div className="navbar-links">
                    <Link to="/login" className="navbar-button">Login</Link>
                    <Link to="/signup" className="navbar-button">Sign Up</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-container">
                <h1 className="hero-title">Discover Your Next Favorite Movie</h1>
                <p className="hero-subtitle">Explore a world of movies tailored just for you!</p>
                <br></br>
                <Link to="/get-recommendation" className="homepage-button">Get Recommendation</Link>
            </div>

            {/* Featured Movies Section */}
            <div className="featured-movies-container">
                <h2 className="featured-title">Featured Movies</h2>
                {loading ? (
                    <p>Loading featured movies...</p> // Loading state message
                ) : error ? (
                    <p>{error}</p> // Error message
                ) : (
                    <div className="movies-carousel" ref={carouselRef}>
                        {featuredMovies.map((movie) => (
                            <Link to={`/movie/${movie.id}`} className="movie-card" key={movie.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster of ${movie.title}`} className="movie-image" />
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-rating">Rating: {movie.vote_average}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Top Movies Tabs */}
            <div className="top-movies-container">
                <br></br>
                <h2 className="tab-top-title">Top Movies</h2>
                <br></br>
                <div className="tabs-container">
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="day" title="Top Day">
                            <div className="tab-movies-list">
                                {loading ? (
                                    <p>Loading top movies...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : (
                                    <table className="tab-movies-table">
                                        <tbody>
                                            {topMoviesDay.map((movie, index) => (
                                                <tr key={index}>
                                                    <td className="tab-movie-title">
                                                        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="month" title="Top Month">
                            <div className="tab-movies-list">
                                {loading ? (
                                    <p>Loading top movies...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : (
                                    <table className="tab-movies-table">
                                        <tbody>
                                            {topMoviesMonth.map((movie, index) => (
                                                <tr key={index}>
                                                    <td className="tab-movie-title">
                                                        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="year" title="Top Year">
                            <div className="tab-movies-list">
                                {loading ? (
                                    <p>Loading top movies...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : (
                                    <table className="tab-movies-table">
                                        <tbody>
                                            {topMoviesYear.map((movie, index) => (
                                                <tr key={index}>
                                                    <td className="tab-movie-title">
                                                        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-container">
                <p className="footer-text">&copy; 2024 MovieFinder. All rights reserved.</p>
                <div className="footer-links-container">
                    <a href="#contact" className="footer-link">Contact</a>
                    <a href="#terms" className="footer-link">Terms of Use</a>
                    <a href="#privacy" className="footer-link">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
