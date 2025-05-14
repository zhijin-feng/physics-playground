import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // 👈 引入样式

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Physics Playground</h1>
            <p className="home-subtitle">Your own physics lab</p>
            <Link to="/simulation">
                <button className="home-button">Start Simulation</button>
            </Link>
        </div>
    );
}

export default Home;
