import { useRef, useEffect, useState } from 'react';
import '../../styles/simulation.css';

function CollisionSimulation() {
    const canvasRef = useRef(null);
    const ballsRef = useRef([]); // 用来存储所有小球的状态（x, y, vx, vy）
    const [lastClickPos, setLastClickPos] = useState(null);
    const [vxInput, setVxInput] = useState('');
    const [vyInput, setVyInput] = useState('');


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let animationFrameId;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 更新小球位置并处理边界碰撞
            ballsRef.current.forEach((ball) => {
                // 更新位置
                ball.x += ball.vx;
                ball.y += ball.vy;

                // 边界反弹逻辑（保留 10 像素半径）
                if (ball.x < 10 || ball.x > canvas.width - 10) {
                    ball.vx *= -1;
                    ball.x = Math.max(10, Math.min(ball.x, canvas.width - 10));
                }
                if (ball.y < 10 || ball.y > canvas.height - 10) {
                    ball.vy *= -1;
                    ball.y = Math.max(10, Math.min(ball.y, canvas.height - 10));
                }
            });

            // 小球之间的碰撞检测与响应
            for (let i = 0; i < ballsRef.current.length; i++) {
                for (let j = i + 1; j < ballsRef.current.length; j++) {
                    const b1 = ballsRef.current[i];
                    const b2 = ballsRef.current[j];

                    const dx = b2.x - b1.x;
                    const dy = b2.y - b1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = 20; // 半径为10的两个小球

                    if (dist < minDist) {
                        // 单位法向量
                        const nx = dx / dist;
                        const ny = dy / dist;

                        // 相对速度
                        const dvx = b1.vx - b2.vx;
                        const dvy = b1.vy - b2.vy;

                        // 相对速度在法线方向上的分量
                        const dot = dvx * nx + dvy * ny;

                        if (dot > 0) continue; // 已远离，不反应

                        // 速度更新（简化弹性碰撞，质量相等）
                        const impulse = dot;

                        b1.vx -= impulse * nx;
                        b1.vy -= impulse * ny;
                        b2.vx += impulse * nx;
                        b2.vy += impulse * ny;

                        // 位置修正：避免两个小球重叠
                        const overlap = (minDist - dist) / 2;
                        b1.x -= nx * overlap;
                        b1.y -= ny * overlap;
                        b2.x += nx * overlap;
                        b2.y += ny * overlap;
                    }
                }
            }


            // 画小球
            ballsRef.current.forEach((ball) => {
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
                ctx.fillStyle = 'red';
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        }

        draw();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // 点击画布添加小球
    const MAX_BALLS = 10;

    const handleCanvasClick = (e) => {
        if (ballsRef.current.length >= MAX_BALLS) {
            alert(`Too many balls! Limit is ${MAX_BALLS}.`);
            return;
        }

        const rect = canvasRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // ✅ 把小球加入 ballsRef.current
        ballsRef.current.push({ x: clickX, y: clickY, vx: 0, vy: 0 });

        setLastClickPos({ x: clickX, y: clickY });
    };

    // 为最后点击的小球设置速度
    const handleSetVelocity = () => {
        if (!lastClickPos) return alert('Please click on the canvas to place a ball first.');

        const vx = parseFloat(vxInput);
        const vy = parseFloat(vyInput);

        if (isNaN(vx) || isNaN(vy)) return alert('Please enter valid numbers for velocity.');

        // 查找最后点击位置对应的小球
        for (let i = ballsRef.current.length - 1; i >= 0; i--) {
            const ball = ballsRef.current[i];
            if (ball.x === lastClickPos.x && ball.y === lastClickPos.y) {
                ball.vx = vx;
                ball.vy = vy;
                break;
            }
        }
    };

    // 删除最后一个小球
    const handleDeleteLastBall = () => {
        if (ballsRef.current.length === 0) {
            alert('No balls to delete!');
            return;
        }
        ballsRef.current.pop();
        setRenderTrigger((r) => r + 1);
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            {/* 画布区域 */}
            <canvas
                ref={canvasRef}
                width={600}
                height={500}
                onClick={handleCanvasClick}
                style={{
                    border: '1px solid white',
                    borderRadius: '10px',
                    backgroundColor: '#121212',
                }}
            />

            {/* 右侧输入面板 */}
            <div
                className="sim-ai-answer-panel"
                style={{
                    width: 400,
                    height: 500,
                    padding: '1rem',
                    boxSizing: 'border-box',
                    backgroundColor: '#1e1e1e',
                    color: 'white',
                    borderRadius: '10px',
                }}
            >
                <h3>Set Velocity for Last Ball</h3>
                <label>
                    Velocity X:{' '}
                    <input
                        type="number"
                        value={vxInput}
                        onChange={(e) => setVxInput(e.target.value)}
                        style={{ width: '100%', marginBottom: '0.5rem' }}
                    />
                </label>
                <label>
                    Velocity Y:{' '}
                    <input
                        type="number"
                        value={vyInput}
                        onChange={(e) => setVyInput(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </label>
                <button onClick={handleSetVelocity} className="sim-ai-button" style={{ marginTop: '1rem' }}>
                    Set Velocity
                </button>

                {/* 新增删除按钮 */}
                <button onClick={handleDeleteLastBall} className="sim-ai-button" style={{ marginTop: '1rem', backgroundColor: '#a33' }}>
                    Delete Last Ball
                </button>

            </div>
        </div>
    );
}

export default CollisionSimulation;
