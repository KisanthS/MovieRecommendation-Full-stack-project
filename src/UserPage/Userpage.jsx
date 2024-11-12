// src/Userpage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './Userpage.css';

const Userpage = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const carouselRef = useRef(null);
    const [activeTab, setActiveTab] = useState('day');
    const [topMoviesDay, setTopMoviesDay] = useState([]);
    const [topMoviesMonth, setTopMoviesMonth] = useState([]);
    const [topMoviesYear, setTopMoviesYear] = useState([]);
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState(() => localStorage.getItem('username') || "User");

    const apiKey = '5c49b6e2a36066a5b1491648804ef4c1';

    // Function to fetch movie data
    const fetchMoviesData = async () => {
        setLoading(true);
        setError("");
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
            setError("Error fetching movie data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch movie data on component mount
    useEffect(() => {
        fetchMoviesData();
    }, []);

    // Sync userName with localStorage whenever it changes
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUserName = localStorage.getItem('username');
            if (storedUserName && storedUserName !== userName) {
                setUserName(storedUserName);
            }
        };

        // Listen for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [userName]);

    // Scroll carousel effect
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
        <div className="userpage-container">
            {/* Navigation Bar */}
            <nav className="userpage-navbar-container">
                <div className="userpage-navbar-logo">MovieFinder</div>
                <div className="userpage-navbar-search">
                    <input
                        type="text"
                        className="userpage-search-input"
                        placeholder="Search for movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Link to={`/search?query=${encodeURIComponent(searchQuery)}`} className="userpage-search-button">
                        Search
                    </Link>
                </div>
                <div className="userpage-navbar-user">
                    <div className="userpage-navbar-profile-icon">
                        {userName.charAt(0).toUpperCase()}
                    </div>&nbsp;&nbsp;&nbsp;
                    <Link to="/userdashboard" className="userpage-navbar-user-name">
                        {userName.toUpperCase()}
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </nav>

            {/* Hero Section */}
            <div className="userpage-hero-container">
                <h1 className="userpage-hero-title">Discover Your Next Favorite Movie</h1>
                <p className="userpage-hero-subtitle">Explore a world of movies tailored just for you!</p>
                <br></br>
                <Link to="/get-recommendation" className="homepage-button">Get Recommendation</Link>
            </div>

            {/* Featured Movies Section */}
            <div className="userpage-featured-movies-container">
                <h2 className="userpage-featured-title">Featured Movies</h2>
                {loading ? (
                    <p>Loading featured movies...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="userpage-movies-carousel" ref={carouselRef}>
                        {featuredMovies.map((movie) => (
                            <Link to={`/movie/${movie.id}`} className="userpage-movie-card" key={movie.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster of ${movie.title}`} className="movie-image" />
                                <h3 className="userpage-movie-title">{movie.title}</h3>
                                <p className="userpage-movie-rating">Rating: {movie.vote_average}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Top Movies Tabs */}
            <div className="userpage-top-movies-container">
                <h2 className="userpage-tab-top-title">Top Movies</h2>
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="day" title="Top Day">
                        <div className="userpage-tab-movies-list">
                            {loading ? (
                                <p>Loading top movies...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <table className="userpage-tab-movies-table">
                                    <tbody>
                                        {topMoviesDay.map((movie, index) => (
                                            <tr key={index}>
                                                <td className="userpage-tab-movie-title">
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
                        <div className="userpage-tab-movies-list">
                            {loading ? (
                                <p>Loading top movies...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <table className="userpage-tab-movies-table">
                                    <tbody>
                                        {topMoviesMonth.map((movie, index) => (
                                            <tr key={index}>
                                                <td className="userpage-tab-movie-title">
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
                        <div className="userpage-tab-movies-list">
                            {loading ? (
                                <p>Loading top movies...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <table className="userpage-tab-movies-table">
                                    <tbody>
                                        {topMoviesYear.map((movie, index) => (
                                            <tr key={index}>
                                                <td className="userpage-tab-movie-title">
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
             {/* Footer */}
             <footer className="user-footer-container">
                <p className="user-footer-text">&copy; 2024 MovieFinder. All rights reserved.</p>
                <div className="user-footer-links-container">
                    <a href="#contact" className="user-footer-link">Contact</a>
                    <a href="#terms" className="user-footer-link">Terms of Use</a>
                    <a href="#privacy" className="user-footer-link">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
};
export default Userpage;