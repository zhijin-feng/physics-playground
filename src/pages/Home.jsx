import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // 👈 引入样式

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Physics Playground</h1>
            <p className="home-subtitle">打造属于你的物理模拟实验室</p>
            <Link to="/simulation">
                <button className="home-button">进入模拟页面</button>
            </Link>
        </div>
    );
}

export default Home;
