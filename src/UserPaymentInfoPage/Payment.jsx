import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaGooglePay, FaApple, FaBitcoin } from 'react-icons/fa';
import './Payment.css';

const Payment = () => {
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const [isFreeTrial, setIsFreeTrial] = useState(true);

    const plans = [
        {
            name: 'Basic Plan',
            price: '$5/month',
            features: [
                'Personalized recommendations (weekly)',
                'Access to trailers',
                'Watch 1 movie per week',
                'Ad-supported'
            ]
        },
        {
            name: 'Standard Plan',
            price: '$10/month',
            features: [
                'All features from Basic',
                'Early access to new releases',
                'Watch 3 movies per week',
                'Ad-free'
            ]
        },
        {
            name: 'Premium Plan',
            price: '$20/month',
            features: [
                'All features from Standard',
                'Unlimited streaming of curated movies',
                'Exclusive behind-the-scenes content',
                'Ad-free, no interruptions'
            ]
        }
    ];

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const toggleFreeTrial = () => {
        setIsFreeTrial(!isFreeTrial);
    };

    return (
        <div className="payment-container">
            <header className="payment-header">
                <h1>Welcome to MovieFinder!</h1>
                <p>Choose the perfect plan to unlock the full potential of your movie discovery experience.</p>
            </header>

            <section className="payment-plans">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`plan-card ${selectedPlan === plan.name.toLowerCase() ? 'selected' : ''}`}
                        onClick={() => handlePlanSelect(plan.name.toLowerCase())}
                    >
                        <h2>{plan.name}</h2>
                        <p className="plan-price">{plan.price}</p>
                        <ul>
                            {plan.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                        <button className="select-plan-btn">Select Plan</button>
                    </div>
                ))}
            </section>

            <section className="additional-features">
                <h3>Additional Features</h3>
                <ul>
                    <li><span className="feature-icon">🎬</span> Streaming integration with Netflix, Amazon Prime, and Disney+</li>
                    <li><span className="feature-icon">🤖</span> AI-powered personalized movie recommendations</li>
                    <li><span className="feature-icon">🔄</span> Cross-device syncing</li>
                    <li><span className="feature-icon">💬</span> Exclusive content for paid members</li>
                </ul>
            </section>

            <section className="free-trial">
                <p className="free-trial-text">
                    {isFreeTrial ? '7-day Free Trial active!' : 'Free Trial not active'}
                </p>
                <div
                    className={`toggle-slider ${isFreeTrial ? 'active' : ''}`}
                    onClick={toggleFreeTrial}
                >
                    <span className="toggle-slider-circle"></span>
                </div>
            </section>

            <section className="payment-options">
                <h3>Payment Options</h3>
                <div className="payment-icons">
                    <div className="payment-icon">
                        <FaCreditCard size={40} />
                        <p>Credit Card</p>
                    </div>
                    <div className="payment-icon">
                        <FaPaypal size={40} />
                        <p>PayPal</p>
                    </div>
                    <div className="payment-icon">
                        <FaGooglePay size={40} />
                        <p>Google Pay</p>
                    </div>
                    <div className="payment-icon">
                        <FaApple size={40} />
                        <p>Apple Pay</p>
                    </div>
                    <div className="payment-icon">
                        <FaBitcoin size={40} />
                        <p>Cryptocurrency</p>
                    </div>
                </div>
            </section>

            <section className="faq">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-item">
                    <h4>Can I change my plan later?</h4>
                    <p>Yes! You can easily upgrade or downgrade your plan at any time through the settings page.</p>
                </div>
                <div className="faq-item">
                    <h4>What happens after my trial ends?</h4>
                    <p>Your trial will automatically convert to the Standard Plan unless you cancel. You can manage your subscription in your account settings.</p>
                </div>
            </section>

            <footer className="payment-footer">
                <p>Need help? <a href="mailto:support@moviefinder.com">Contact Support</a></p>
                <p><a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms & Conditions</a></p>
            </footer>
        </div>
    );
};

export default Payment;
