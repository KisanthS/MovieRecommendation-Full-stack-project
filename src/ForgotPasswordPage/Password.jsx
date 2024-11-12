// Password.jsx
import React, { useState } from 'react';
import './Password.css';

const Password = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordReset = () => {
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }
        alert('Password reset successfully!');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="password-reset-container">
            <h2>Reset Password</h2>
            <div className="password-form-background">
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="password-reset-input"
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="password-reset-input"
                />
                <button onClick={handlePasswordReset} className="password-reset-button">
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default Password;
