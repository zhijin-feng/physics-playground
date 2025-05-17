// src/pages/Simulation.jsx

import React, { useState } from 'react';
import GravitySimulation from '../components/simulations/GravitySimulation.jsx';
import '../styles/simulation.css';
import CollisionSimulation from "../components/simulations/CollisionSimulation.jsx";
import NonNewtonianFluidSimulation from "../components/simulations/NonNewtonianFluidSimulation.jsx"; // 引入样式文件

const Simulation = () => {
    // 用于记录当前选中的模拟
    const [activeSimulation, setActiveSimulation] = useState('gravity');

    return (
        <div className="sim-page-layout">
            {/* 左侧导航栏 */}
            <div className="sim-sidebar">
                <div className="sim-sidebar-title">Simulations</div>

                {/* 模拟按钮 */}
                <button
                    className={`sim-nav-button ${activeSimulation === 'gravity' ? 'active' : ''}`}
                    onClick={() => setActiveSimulation('gravity')}
                >
                    Gravity Simulation
                </button>

                <button
                    className={`sim-nav-button ${activeSimulation === 'collision' ? 'active' : ''}`}
                    onClick={() => setActiveSimulation('collision')}
                >
                    Collision Simulation
                </button>

                <button
                    className={`sim-nav-button ${activeSimulation === 'fluid' ? 'active' : ''}`}
                    onClick={() => setActiveSimulation('fluid')}
                >
                    Non-Newtonian Simulation
                </button>

                {/* 你可以继续添加更多模拟页面的按钮 */}
            </div>

            {/* 主内容区 */}
            <div className="sim-main-content">
                <div className="sim-header">
                    {/*<a href="/" className="sim-back-link">Back to Home</a>*/}
                    <h1 className="sim-title">Simulation Page</h1>
                </div>

                <div className="sim-main-area">
                    {/* 根据选中的模拟显示不同的内容 */}
                    {activeSimulation === 'gravity' && <GravitySimulation />}
                    {/* 你可以在这里添加其他模拟组件，如 CollisionSimulation */}
                    {activeSimulation === 'collision' && <CollisionSimulation />}
                    {activeSimulation === 'fluid' && <NonNewtonianFluidSimulation />}
                </div>
            </div>

            {/* 固定在左上角的返回链接 */}
            <a href="/" className="sim-back-link">Back to Home</a> {/* 修改: 将链接放置在左上角 */}
        </div>
    );
};

export default Simulation;
