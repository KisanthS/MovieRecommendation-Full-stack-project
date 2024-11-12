import React, { useState, useEffect } from 'react';
import './ProfileOverview.css';
import GenreSelector from '../GenreSelectPage/GenreSelector'; // Import the GenreSelector

const ProfileOverview = ({
  userName,
  userEmail,
  profilePictureUrl,
  handleFileChange,
}) => {
  // Initialize state with values from localStorage (if available)
  const [userBio, setUserBio] = useState(localStorage.getItem('userBio') || '');
  const [userDob, setUserDob] = useState(localStorage.getItem('userDob') || '');
  const [selectedGenres, setSelectedGenres] = useState(
    JSON.parse(localStorage.getItem('selectedGenres')) || []
  );

  const [genres, setGenres] = useState([]);

  // Fetch genres from API
  useEffect(() => {
    // Assuming this is your genres API endpoint
    fetch('https://api.example.com/genres')
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres); // Assuming response has a `genres` array
      })
      .catch(error => console.error("Error fetching genres:", error));
  }, []);

  // Handle profile update (saves data locally)
  const updateProfile = () => {
    // Save bio, dob, and genres to localStorage
    localStorage.setItem('userBio', userBio);
    localStorage.setItem('userDob', userDob);
    localStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));

    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-overview-container">
      <h2 style={{ fontWeight: 'bold', color: 'white' }}>Profile Overview</h2>
      <h3>Welcome {userName}</h3>
      <p>Name: {userName}</p>
      <p>Email: {userEmail}</p>

      {/* Profile Picture */}
      <div className="profile-overview-picture-container">
        <div className="profile-overview-picture">
          <img
            src={profilePictureUrl || 'default-profile.jpg'}
            alt="Profile"
            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          />
        </div>
        <label htmlFor="file-upload" style={{ marginTop: '10px', cursor: 'pointer', fontSize: '12px' }}>
          Choose a file
        </label>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      </div>

      {/* Bio */}
      <div className="profile-overview-bio">
        <h4>Bio</h4>
        <textarea
          value={userBio}
          placeholder="Add your bio"
          onChange={(e) => setUserBio(e.target.value)}
        />
      </div>

      {/* Date of Birth */}
      <div className="profile-overview-dob">
        <h4>Date of Birth</h4>
        <input
          type="date"
          value={userDob}
          onChange={(e) => setUserDob(e.target.value)}
        />
      </div>

      {/* Genre Selection */}
      <div className="profile-overview-genres">
        <h4>Genres of Interest</h4>
        <GenreSelector
          genres={genres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      </div>

      {/* Update Button */}
      <div className="profile-overview-update-button">
        <button onClick={updateProfile}>Update</button>
      </div>
    </div>
  );
};

export default ProfileOverview;