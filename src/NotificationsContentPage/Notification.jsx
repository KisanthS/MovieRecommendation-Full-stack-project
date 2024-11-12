import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa"; // Email icon
import axios from "axios"; // For API requests
import './Notification.css';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);

    // API Key to fetch trending movies
    const API_KEY = "5c49b6e2a36066a5b1491648804ef4c1";

    // Function to fetch trending movies from the API
    const fetchTrendingMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
            );
            const movies = response.data.results;
            const trendingMovies = movies.map((movie) => ({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                releaseDate: movie.release_date,
            }));
            setNotifications(trendingMovies);
        } catch (error) {
            console.error("Error fetching trending movies:", error);
        }
    };

    // Toggle for email notifications
    const toggleEmailNotifications = () => {
        setIsEmailEnabled(!isEmailEnabled);
        if (isEmailEnabled) {
            // If email is enabled, send a request to start sending notifications
            console.log("Sending email notifications enabled.");
        } else {
            // If email is disabled, stop notifications
            console.log("Sending email notifications disabled.");
        }
    };

    // Fetch notifications on component mount
    useEffect(() => {
        fetchTrendingMovies();
    }, []);

    return (
        <div className="notification-page">
            <header className="notification-header">
                <h1>Notifications</h1>
            </header>
            
            <div className="noti-email-toggle">
                <label className="noti-toggle-switch">
                    <span>Receive Email Notifications</span>
                    <span className="noti-toggle-slider-container">
                        <input
                            type="checkbox"
                            checked={isEmailEnabled}
                            onChange={toggleEmailNotifications}
                            className="noti-toggle-input"
                        />
                        <span className="noti-toggle-slider"></span>
                    </span>
                </label>
            </div>


            <div className="notification-list">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div className="notification-card" key={notification.id}>
                            <h2>{notification.title}</h2>
                            <p>{notification.overview}</p>
                            <p>Release Date: {notification.releaseDate}</p>
                            <button className="mark-as-read">Mark as Read</button>
                        </div>
                    ))
                ) : (
                    <p>No new notifications.</p>
                )}
            </div>
        </div>
    );
};

export default NotificationPage;
