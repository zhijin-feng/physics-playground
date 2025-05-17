import React, { useRef, useEffect } from 'react';

const CUP_WIDTH = 200;
const CUP_HEIGHT = 300;
const PARTICLE_RADIUS = 5;
const PARTICLE_SPACING = 15;
const GRAVITY = 0.2;
const FRICTION = 0.95;

function NewtonianFluidSimulation() {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const velocityRef = useRef({ x: 0, y: 0 });
    const prevMouseRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 杯子左上角位置
        const cupX = 150;
        const cupY = 50;

        // 粒子排布在杯子内部，装满杯子下半部分
        const particles = [];
        // 装满一半高度，排布从杯底往上半杯高度
        for (let x = PARTICLE_RADIUS; x < CUP_WIDTH - PARTICLE_RADIUS; x += PARTICLE_SPACING) {
            for (
                let y = CUP_HEIGHT / 2 + PARTICLE_RADIUS;
                y < CUP_HEIGHT - PARTICLE_RADIUS;
                y += PARTICLE_SPACING
            ) {
                particles.push({
                    x,
                    y,
                    vx: 0,
                    vy: 0,
                    originalX: x,
                    originalY: y,
                });
            }
        }
        particlesRef.current = particles;

        function drawCup() {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.rect(cupX, cupY, CUP_WIDTH, CUP_HEIGHT);
            ctx.stroke();
        }

        function drawParticles() {
            ctx.fillStyle = 'cyan';
            particlesRef.current.forEach((p) => {
                ctx.beginPath();
                ctx.arc(cupX + p.x, cupY + p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function updateParticles() {
            particlesRef.current.forEach((p) => {
                // 弹性回到原位置
                const dx = p.originalX - p.x;
                const dy = p.originalY - p.y;

                p.vx += dx * 0.1;
                p.vy += dy * 0.1;

                // 施加全局加速度（重力 + 鼠标晃动）
                p.vx += velocityRef.current.x;
                p.vy += velocityRef.current.y + GRAVITY;

                p.vx *= FRICTION;
                p.vy *= FRICTION;

                p.x += p.vx;
                p.y += p.vy;

                // 边界约束在杯子内部
                p.x = Math.min(Math.max(PARTICLE_RADIUS, p.x), CUP_WIDTH - PARTICLE_RADIUS);
                p.y = Math.min(Math.max(CUP_HEIGHT / 2 + PARTICLE_RADIUS, p.y), CUP_HEIGHT - PARTICLE_RADIUS);
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCup();
            updateParticles();
            drawParticles();

            velocityRef.current.x *= 0.9;
            velocityRef.current.y *= 0.9;

            requestAnimationFrame(animate);
        }

        animate();

        function onMouseMove(e) {
            if (prevMouseRef.current) {
                const dx = e.clientX - prevMouseRef.current.x;
                const dy = e.clientY - prevMouseRef.current.y;
                velocityRef.current.x += dx * 0.1;
                velocityRef.current.y += dy * 0.1;
            }
            prevMouseRef.current = { x: e.clientX, y: e.clientY };
        }

        function onMouseUp() {
            prevMouseRef.current = null;
        }

        canvas.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            canvas.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#121212', padding: '1rem', borderRadius: '10px' }}>
            <canvas
                ref={canvasRef}
                width={500}
                height={400}
                style={{ border: '2px solid white', borderRadius: '10px', backgroundColor: '#000' }}
            />
            <p style={{ color: 'white' }}>Drag mouse on canvas to shake the fluid inside the cup.</p>
        </div>
    );
}

export default NewtonianFluidSimulation;
