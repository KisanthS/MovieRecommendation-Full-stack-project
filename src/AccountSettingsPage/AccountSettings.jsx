import React, { useState, useEffect } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [language, setLanguage] = useState('English');
    const [region, setRegion] = useState('US');

    // Fetch user data from local storage or API
    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) setEmail(savedEmail);

        const saved2FA = localStorage.getItem('is2FAEnabled') === 'true';
        setIs2FAEnabled(saved2FA);
        setLanguage(localStorage.getItem('language') || 'English');
        setRegion(localStorage.getItem('region') || 'US');
    }, []);

    const handleEmailUpdate = () => {
        localStorage.setItem('email', email);
        alert('Email updated successfully!');
    };

    const handle2FAToggle = () => {
        setIs2FAEnabled(!is2FAEnabled);
        localStorage.setItem('is2FAEnabled', !is2FAEnabled);
        alert(`Two-Factor Authentication ${!is2FAEnabled ? 'enabled' : 'disabled'}.`);
    };

    const handleAccountDeletion = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deleted successfully.'); // Here you would implement deletion logic.
        }
    };

    const handleLanguageRegionChange = () => {
        localStorage.setItem('language', language);
        localStorage.setItem('region', region);
        alert('Language and region settings updated.');
    };

    return (
        <div className="account-details-container">
            <h2 className="account-details-title">Account Settings</h2>

            {/* Update Email */}
            <div className="account-details-section email-section">
                <h3 className="account-details-subtitle">Update Email</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="account-details-input email-input"
                />
                <button onClick={handleEmailUpdate} className="account-details-button update-email-button">
                    Update Email
                </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="account-details-section twofa-section">
                <h3 className="account-details-subtitle">Two-Factor Authentication</h3>
                <label className="account-details-label twofa-label">
                    <input
                        type="checkbox"
                        checked={is2FAEnabled}
                        onChange={handle2FAToggle}
                        className="twofa-checkbox"
                    />
                    <br></br>
                    Enable Two-Factor Authentication
                </label>
                <br></br>
                <p className="twofa-description">
                    Checking this box adds an extra layer of security to your account by requiring a code from your phone.
                </p>
                <p className="twofa-description">
                    This helps protect your account even if your password is compromised.
                </p>
            </div>


            {/* Account Deletion */}
            <div className="account-details-section deletion-section">
                <h3 className="account-details-subtitle">Account Deletion</h3>
                <br></br>
                <button onClick={handleAccountDeletion} className="account-details-button delete-button">
                    Delete Account
                </button>
                <p className="deletion-description">
                    <br></br>
                    Deleting your account will permanently erase all your data. This action cannot be undone.
                </p>
                <p className="deletion-description">
                    Please make sure you have saved any important information before proceeding.
                </p>
            </div>


            {/* Language and Region Settings */}
            <div className="account-details-section language-region-section">
                <h3 className="account-details-subtitle">Language and Region Settings</h3>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="account-details-select language-select"
                >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                </select>
                <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="account-details-select region-select"
                >
                    <option value="US">United States</option>
                    <option value="EU">Europe</option>
                    <option value="ASIA">Asia</option>
                </select>
                <button onClick={handleLanguageRegionChange} className="account-details-button update-language-region-button">
                    Update Settings
                </button>
            </div>
        </div>
    );
};

export default AccountSettings;
