import React, { useRef, useEffect } from 'react';
import '../styles/simulation.css';
import { Link } from 'react-router-dom';

function Simulation() {
    const canvasRef = useRef(null);
    //useRef returns an object that stores the initialValue and won't be rerendered when the value is

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 物理模拟参数
        const gravity = 9.8; // 重力加速度 (m/s²)
        let ballRadius = 20;
        let ballX = canvas.width / 2;
        let ballY = 50;
        let ballSpeedY = 0; // 初始速度
        let ballSpeedX = 0;
        let friction = 0.99; // 摩擦力（控制弹跳高度）

        // 画球的函数
        function drawBall() {
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#FF6347"; // 橙色球
            ctx.fill();
            ctx.closePath();
        }

        // 更新物理模拟
        function update() {
            // 更新速度和位置
            ballSpeedY += gravity * 0.2; // 加速度
            ballY += ballSpeedY; // 更新位置

            // 碰撞检测：小球到达底部后反弹
            if (ballY + ballRadius > canvas.height) {
                ballY = canvas.height - ballRadius; // 防止穿透
                ballSpeedY = -ballSpeedY * friction; // 反弹并降低速度
            }

            // 清除画布并重新绘制
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();

            // 请求下一帧
            requestAnimationFrame(update);
        }

        // 设置画布大小
        canvas.width = 800;
        canvas.height = 600;

        // 开始模拟
        update();
    }, []);

    return (
        <div className="simulation-page">
            <header className="simulation-header">
                <Link to="/" className="back-button">← Home</Link>
                <h1 className="simulation-title">Gravity Simulation</h1>
            </header>

            <main className="simulation-main">
                <div className="simulation-canvas">
                    <canvas ref={canvasRef} />
                </div>
            </main>
        </div>
    );
}

export default Simulation;

