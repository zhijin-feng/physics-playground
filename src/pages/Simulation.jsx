import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/simulation.css';

function Simulation() {
    return (
        <div className="simulation-page">
            <header className="simulation-header">
                <Link to="/" className="back-button">← 返回首页</Link>
                <h1 className="simulation-title">重力模拟器</h1>
            </header>

            <main className="simulation-main">
                <div className="simulation-canvas">
                    {/* 这里稍后放 canvas 或动画组件 */}
                    <p className="placeholder-text">这里是模拟区域</p>
                </div>
            </main>
        </div>
    );
}

export default Simulation;
