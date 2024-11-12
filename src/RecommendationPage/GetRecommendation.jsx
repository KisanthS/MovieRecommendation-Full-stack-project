import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './GetRecommendation.css';

function GetRecommendation() {
  const API_KEY = '5c49b6e2a36066a5b1491648804ef4c1'; // Securely store API key
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const questions = [
    {
      question: "I'm watching with (choose all)",
      options: [
        "Netflix",
        "Amazon Prime",
        "Hulu",
        "Disney+",
        "HBO Max",
        "Apple TV+",
        "Other"
      ],
    },
    {
      question: "I feel like...",
      options: [
        { text: "Dramatic", genres: [28, 12, 18] },
        { text: "Intense", genres: [27, 53] },
        { text: "Gentle", genres: [35, 10751, 10749] },
        { text: "Curious", genres: [36, 9648] },
        { text: "Out of this world", genres: [14, 878] },
        { text: "Realistic", genres: [99] },
        { text: "Let me pick specifically", genres: [] },
        { text: "I don't care", genres: [] },
      ],
    },
    {
      question: "When from?",
      options: [
        "This year",
        "Last few years",
        "Last 10 years",
        "Last 25 years",
        "Last 100 years",
        "Let me pick specifically",
        "I still don't care",
      ],
    },
    {
      question: "And is...",
      options: [
        "Highly rated (Over 7/10 rated)",
        "At least average (Over 5/10 rated)",
        "I don't mind",
      ],
    },
    {
      question: "For how long...",
      options: [
        "A shorter film (-90 minutes)",
        "Average length (1.5 to 2.5 hours)",
        "A long film (2.5 hours+)",
        "Time is relative",
      ],
    },
    {
      question: "Show me...",
      options: [
        "5 movies",
        "10 movies",
        "20 movies",
      ],
    },
  ];

  const handleAnswer = async (option) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: option };
    setAnswers(newAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      await fetchRecommendation(newAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const fetchRecommendation = async (userAnswers) => {
    try {
      const genreIds = userAnswers[1]?.genres || [];
      const releaseDateRange = getReleaseDateRange(userAnswers[2]);
      const ratingFilter = getRatingFilter(userAnswers[3]);
      const runtimeFilter = getRuntimeFilter(userAnswers[4]);

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: API_KEY,
            with_genres: genreIds.join(','),
            primary_release_date: releaseDateRange,
            vote_average: ratingFilter,
            with_runtime: runtimeFilter,
          },
        }
      );
      setRecommendations(response.data.results.slice(0, userAnswers[5] === "5 movies" ? 5 : 10)); // Adjust the number of movies based on the answer
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  const getReleaseDateRange = (timePeriod) => {
    switch (timePeriod) {
      case "This year":
        return "2024-01-01,2024-12-31";
      case "Last few years":
        return "2020-01-01,2023-12-31";
      case "Last 10 years":
        return "2014-01-01,2023-12-31";
      case "Last 25 years":
        return "1999-01-01,2023-12-31";
      case "Last 100 years":
        return "1924-01-01,2023-12-31";
      default:
        return "";
    }
  };

  const getRatingFilter = (ratingOption) => {
    switch (ratingOption) {
      case "Highly rated (Over 7/10 rated)":
        return "7";
      case "At least average (Over 5/10 rated)":
        return "5";
      default:
        return "0";
    }
  };

  const getRuntimeFilter = (runtimeOption) => {
    switch (runtimeOption) {
      case "A shorter film (-90 minutes)":
        return "0,90";
      case "Average length (1.5 to 2.5 hours)":
        return "90,150";
      case "A long film (2.5 hours+)":
        return "150,999";
      default:
        return "";
    }
  };

  // Handle click on a movie
  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`); // Navigate to the correct route
  };

  return (
    <div className="get-recom-container">
      {!recommendations.length ? (
        <div className="get-recom-question">
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className="get-recom-options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className="get-recom-button"
                onClick={() => handleAnswer(option)}
              >
                {typeof option === "string" ? option : option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="get-recom-result">
          <h2>Your Recommended Movies</h2>
          <div className="get-recom-movie-container">
            {recommendations.map((movie) => (
              <div
                key={movie.id}
                className="get-recom-movie-item"
                onClick={() => handleMovieClick(movie)} // Add the click handler here
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="get-recom-movie-image"
                />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GetRecommendation;