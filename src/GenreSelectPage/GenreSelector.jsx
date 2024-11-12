import React, { useState } from 'react';
import './GenreSelector.css';

const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

const GenreSelector = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);

    const toggleGenre = (genre) => {
        setSelectedGenres((prevGenres) =>
            prevGenres.includes(genre)
                ? prevGenres.filter((g) => g !== genre)
                : [...prevGenres, genre]
        );
    };

    return (
        <div className="genre-selector-container">
            <div className="genre-section">
                <h2 style={{ color: 'red', fontWeight: 'normal', fontSize: '18px', textAlign: 'left', marginBottom: '20px' }}>
                    Select Genres
                </h2>
                <div className="available-genres" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-start', marginBottom: '20px' }}>
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            className={`genre-button ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                            onClick={() => toggleGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            <div className="genre-section">
                <h3 style={{ color: 'red', fontWeight: 'normal', fontSize: '18px', textAlign: 'left', marginTop: '-30px' }}>
                    Selected Genres
                </h3>
                {selectedGenres.length > 0 ? (
                    <div className="selected-genres-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedGenres.map((genre) => (
                            <span key={genre} className="selected-genre">
                                {genre}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p>No genres selected yet.</p>
                )}
            </div>
        </div>
    );
};

export default GenreSelector;