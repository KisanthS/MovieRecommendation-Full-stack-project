import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Cast.css';

const API_KEY = "5c49b6e2a36066a5b1491648804ef4c1";
const placeholderImage = 'https://via.placeholder.com/500';  // Placeholder image URL

const Cast = () => {
    const { castId } = useParams();
    const [movies, setMovies] = useState([]);
    const [castDetails, setCastDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCastDetails = async () => {
            try {
                const castResponse = await fetch(`https://api.themoviedb.org/3/person/${castId}?api_key=${API_KEY}`);
                if (!castResponse.ok) throw new Error('Failed to fetch cast details.');
                const castData = await castResponse.json();
                setCastDetails(castData);

                const movieResponse = await fetch(`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${API_KEY}`);
                if (!movieResponse.ok) throw new Error('Failed to fetch movies.');
                const movieData = await movieResponse.json();
                setMovies(movieData.cast || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCastDetails();
    }, [castId]);

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="cast-profile-container">
            {castDetails && (
                <div className="cast-profile-header">
                    <img 
                        src={castDetails.profile_path ? `https://image.tmdb.org/t/p/w500${castDetails.profile_path}` : placeholderImage}
                        alt={castDetails.name}
                        className="cast-profile-image"
                        onError={(e) => e.target.src = placeholderImage}  // Fallback image on error
                    />
                    <div className="cast-profile-info">
                        <h2>{castDetails.name}</h2>
                        <p><strong>Biography:</strong> {castDetails.biography || 'No biography available.'}</p>
                        <p><strong>Birthday:</strong> {castDetails.birthday || 'Not available'}</p>
                        {castDetails.deathday && <p><strong>Deathday:</strong> {castDetails.deathday}</p>}
                        <p><strong>Place of Birth:</strong> {castDetails.place_of_birth || 'Not available'}</p>
                        <p><strong>Known For:</strong> {castDetails.known_for_department || 'Not available'}</p>
                        <p><strong>Gender:</strong> {castDetails.gender === 1 ? 'Female' : castDetails.gender === 2 ? 'Male' : 'Not specified'}</p>
                        <p><strong>Popularity:</strong> {castDetails.popularity}</p>
                        {castDetails.also_known_as && castDetails.also_known_as.length > 0 && (
                            <p><strong>Also Known As:</strong> {castDetails.also_known_as.join(', ')}</p>
                        )}
                        {castDetails.homepage && (
                            <p><strong>Homepage:</strong> <a href={castDetails.homepage} target="_blank" rel="noopener noreferrer">{castDetails.homepage}</a></p>
                        )}
                        {castDetails.imdb_id && (
                            <p><strong>IMDb Profile:</strong> <a href={`https://www.imdb.com/name/${castDetails.imdb_id}`} target="_blank" rel="noopener noreferrer">View on IMDb</a></p>
                        )}
                    </div>
                </div>
            )}

            <div className="cast-movies-list">
                <h3>Movies featuring {castDetails?.name}</h3>
                <div className="cast-movies-grid">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <div 
                                key={movie.id} 
                                className="cast-movie-card" 
                                onClick={() => handleMovieClick(movie.id)} 
                                role="button"
                                tabIndex={0} 
                                onKeyPress={(e) => { if (e.key === 'Enter') handleMovieClick(movie.id); }}
                            >
                                <img 
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderImage}
                                    alt={movie.title}
                                    className="cast-movie-poster"
                                    onError={(e) => e.target.src = placeholderImage}  // Fallback image on error
                                />
                                <div className="cast-movie-title">{movie.title}</div>
                                <div className="cast-movie-details">
                                    <p><strong>Character:</strong> {movie.character || 'Not available'}</p>
                                    <p><strong>Release Date:</strong> {movie.release_date || 'Unknown'}</p>
                                    <p><strong>Rating:</strong> {movie.vote_average ? movie.vote_average : 'Not rated'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No movies available for this cast.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cast;