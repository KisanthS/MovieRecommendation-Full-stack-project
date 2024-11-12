import React, { useState, useEffect } from 'react';
import './Preference.css';
import { FaBell, FaFilm, FaLanguage, FaStar, FaPlay, FaShareAlt } from 'react-icons/fa';

const API_KEY = '5c49b6e2a36066a5b1491648804ef4c1';

const Preference = () => {
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [preferredGenres, setPreferredGenres] = useState([]);
    const [excludedGenres, setExcludedGenres] = useState([]);
    const [preferredLanguages, setPreferredLanguages] = useState([]);
    const [subtitleLanguage, setSubtitleLanguage] = useState('');
    const [contentRating, setContentRating] = useState('PG-13');
    const [matureFilter, setMatureFilter] = useState(false);
    const [watchHistory, setWatchHistory] = useState(true);
    const [personalizedRecommendations, setPersonalizedRecommendations] = useState(true);
    const [newReleaseAlerts, setNewReleaseAlerts] = useState(false);
    const [recommendationAlerts, setRecommendationAlerts] = useState(false);
    const [trailerUpdates, setTrailerUpdates] = useState(false);
    const [videoQuality, setVideoQuality] = useState('HD');
    const [autoplayTrailers, setAutoplayTrailers] = useState(false);
    const [autoplayNextEpisode, setAutoplayNextEpisode] = useState(true);

    useEffect(() => {
        // Fetch genres from TMDB
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(data => setGenres(data.genres || []));

        // Fetch languages from TMDB
        fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => setLanguages(data || []));
    }, []);

    return (
        <div className="preference-container">
            <h1>User Preferences</h1>

            {/* Genre Preferences */}
            <section className="preference-section">
                <h2><FaFilm /> Genre Preferences</h2>
                <div className="preference-checkbox-group">
                    {genres.map((genre) => (
                        <div key={genre.id} className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={preferredGenres.includes(genre.id)}
                                onChange={() => {
                                    if (preferredGenres.includes(genre.id)) {
                                        setPreferredGenres(preferredGenres.filter(id => id !== genre.id));
                                    } else {
                                        setPreferredGenres([...preferredGenres, genre.id]);
                                    }
                                }}
                            />
                            <label>{genre.name}</label>
                        </div>
                    ))}
                </div>
                <br></br>
                <h3>Exclude Genres</h3>
                <div className="preference-checkbox-group">
                    {genres.map((genre) => (
                        <div key={genre.id} className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={excludedGenres.includes(genre.id)}
                                onChange={() => {
                                    if (excludedGenres.includes(genre.id)) {
                                        setExcludedGenres(excludedGenres.filter(id => id !== genre.id));
                                    } else {
                                        setExcludedGenres([...excludedGenres, genre.id]);
                                    }
                                }}
                            />
                            <label>{genre.name}</label>
                        </div>
                    ))}
                </div>
            </section>

            {/* Language Preferences */}
            <section className="preference-section">
                <h2><FaLanguage /> Language Preferences</h2>
                <div className="preference-checkbox-group">
                    {languages.map((language) => (
                        <div key={language.iso_639_1} className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={preferredLanguages.includes(language.iso_639_1)}
                                onChange={() => {
                                    if (preferredLanguages.includes(language.iso_639_1)) {
                                        setPreferredLanguages(preferredLanguages.filter(lang => lang !== language.iso_639_1));
                                    } else {
                                        setPreferredLanguages([...preferredLanguages, language.iso_639_1]);
                                    }
                                }}
                            />
                            <label>{language.english_name}</label>
                        </div>
                    ))}
                </div>
                <br></br>
                <br></br>
                <h3>Subtitle Language</h3>
                <br></br>
                <select value={subtitleLanguage} onChange={(e) => setSubtitleLanguage(e.target.value)}>
                    <option value="">None</option>
                    {languages.map((language) => (
                        <option key={language.iso_639_1} value={language.iso_639_1}>
                            {language.english_name}
                        </option>
                    ))}
                </select>
            </section>

            {/* Content Rating Preferences */}
            <section className="preference-section">
                <h2><FaStar /> Content Rating Preferences</h2>
                <label>Content Rating</label >
                <select value={contentRating} onChange={(e) => setContentRating(e.target.value)}>
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                </select>
                <br></br>
                <br></br>
                <label>Mature Content Filter</label>
                <input
                    type ="checkbox"
                    checked={matureFilter}
                    onChange={() => setMatureFilter(!matureFilter)}
                />
            </section>

            {/* Watch History and Personalization */}
            <section className="preference-section">
                <h2><FaPlay /> Watch History & Personalization</h2>
                <label>Enable Watch History</label>
                <input
                    type="checkbox"
                    checked={watchHistory}
                    onChange={() => setWatchHistory(!watchHistory)}
                />
                <br></br>
                <br></br>
                <label>Enable Personalized Recommendations</label>
                <input
                    type="checkbox"
                    checked={personalizedRecommendations}
                    onChange={() => setPersonalizedRecommendations(!personalizedRecommendations)}
                />
            </section>

            {/* Notification Preferences */}
            <section className="preference-section">
                <h2><FaBell /> Notification Preferences</h2>
                <label>New Release Alerts</label>
                <input
                    type="checkbox"
                    checked={newReleaseAlerts}
                    onChange={() => setNewReleaseAlerts(!newReleaseAlerts)}
                />
                <br></br>
                <br></br>
                <label>Recommendations Alerts</label>
                <input
                    type="checkbox"
                    checked={recommendationAlerts}
                    onChange={() => setRecommendationAlerts(!recommendationAlerts)}
                />
                <br></br>
                <br></br>
                <label>Trailer Updates</label>
                <input
                    type="checkbox"
                    checked={trailerUpdates}
                    onChange={() => setTrailerUpdates(!trailerUpdates)}
                />
            </section>

            {/* Viewing Experience Preferences */}
            <section className="preference-section">
                <h2><FaPlay /> Viewing Experience Preferences</h2>
                <label>Video Quality</label>
                <select value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)}>
                    <option value="SD">SD</option>
                    <option value="HD">HD</option>
                    <option value="4K">4K</option>
                </select>
                <br></br>
                <br></br>
                <label>Autoplay Trailers</label>
                <input
                    type="checkbox"
                    checked={autoplayTrailers}
                    onChange={() => setAutoplayTrailers(!autoplayTrailers)}
                />
                <br></br>
                <br></br>
                <label>Autoplay Next Episode</label>
                <input
                    type="checkbox"
                    checked={autoplayNextEpisode}
                    onChange={() => setAutoplayNextEpisode(!autoplayNextEpisode)}
                />
            </section>
        </div>
    );
};

export default Preference;
