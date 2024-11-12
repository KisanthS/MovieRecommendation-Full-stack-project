// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './HomePage/Homepage';
import Login from './LoginPage/Login';
import SignUp from './SignUpPage/SignUp';
import SearchResults from './SearchResultPage/SearchResults';
import MovieResults from './MovieResultsPage/MovieResults';
import UserPage from './UserPage/Userpage';
import UserDashboard from './DashboardPage/UserDashboard';
import Watchlist from './WatchListPage/Watchlist';
import AccountSettings from './AccountSettingsPage/AccountSettings';
import Password from './ForgotPasswordPage/Password';
import ProfileOverview from './UserProfile/ProfileOverview';
import Preference from './UserPreferencePage/Preference';
import Payment from './UserPaymentInfoPage/Payment';
import Notification from './NotificationsContentPage/Notification';
import Support from './SupportContentPage/Support';
import Cast from './CastProfilePage/Cast';
import Recommendation from './RecommendationPage/GetRecommendation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieResults />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/reset-password" element={<Password />} />
        <Route path="/profile-overview" element={<ProfileOverview />} />
        <Route path="/prefesence" element={<Preference />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cast/:castId" element={<Cast />} />
        <Route path="/get-recommendation" element={<Recommendation />} />
      </Routes>
    </Router>
  );
};

export default App;
