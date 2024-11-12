import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import Watchlist from "../WatchListPage/Watchlist";
import AccountSettings from '../AccountSettingsPage/AccountSettings';
import ProfileOverview from '../UserProfile/ProfileOverview';
import Preference from '../UserPreferencePage/Preference';
import Payment from '../UserPaymentInfoPage/Payment';
import Notification from '../NotificationsContentPage/Notification';
import Support from '../SupportContentPage/Support';

const UserDashboard = () => {
  const [userName, setUserName] = useState(() => localStorage.getItem('username') || "User");
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('email') || "user@example.com");
  const [userBio, setUserBio] = useState(""); // Bio input field
  const [userDob, setUserDob] = useState(""); // Date of Birth input field
  const [profilePictureUrl, setProfilePictureUrl] = useState(""); // Profile picture URL input field
  const [activeTab, setActiveTab] = useState('ProfileOverview');
  const navigate = useNavigate();

  // Sync userName and userEmail with localStorage whenever they change
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserName = localStorage.getItem('username');
      const storedUserEmail = localStorage.getItem('email');

      // Only update if there's a change in localStorage
      if (storedUserName !== userName) {
        setUserName(storedUserName);
      }
      if (storedUserEmail !== userEmail) {
        setUserEmail(storedUserEmail);
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userName, userEmail]); // Keep these dependencies to track when they change

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleUpdate = () => {
    console.log("Profile Updated:", {
      userName,
      userEmail,
      userBio,
      userDob,
      profilePictureUrl
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePictureUrl(reader.result); // Set the uploaded image URL
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard-sidebar">
        <button className="user-dashboard-logout-button" onClick={handleLogout}>Logout</button>
        <h3>Dashboard</h3>
        <ul className="user-dashboard-tabs">
          <li onClick={() => setActiveTab('ProfileOverview')}>Profile Overview</li>
          <li onClick={() => setActiveTab('AccountSettings')}>Account Settings</li>
          <li onClick={() => setActiveTab('Watchlist')}>Watchlist/Bookmarks</li>
          <li onClick={() => setActiveTab('Preferences')}>Preferences</li>
          <li onClick={() => setActiveTab('PaymentInfo')}>Payment Information</li>
          <li onClick={() => setActiveTab('Notifications')}>Notifications</li>
          <li onClick={() => setActiveTab('Support')}>Support</li>
        </ul>
      </div>

      <div className="user-dashboard-content-area">
        {activeTab === 'ProfileOverview' && (
          <ProfileOverview
            userName={userName}
            userEmail={userEmail}
            profilePictureUrl={profilePictureUrl}
            handleFileChange={handleFileChange}
            userBio={userBio}
            setUserBio={setUserBio}
            userDob={userDob}
            setUserDob={setUserDob}
            handleUpdate={handleUpdate}
          />
        )}
        {activeTab === 'Watchlist' && <Watchlist />} {/* Show Watchlist component */}
        {activeTab === 'AccountSettings' && <AccountSettings />}
        {activeTab === 'Preferences' && <Preference/>}
        {activeTab === 'PaymentInfo' && <Payment/>}
        {activeTab === 'Notifications' && <Notification/>}
        {activeTab === 'Support' && <Support/>}
      </div>
    </div>
  );
};

export default UserDashboard;