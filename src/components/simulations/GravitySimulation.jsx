import { useRef, useEffect } from 'react';

function GravitySimulation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let y = 0;
        let vy = 0;
        const gravity = 0.5;
        const bounce = -0.7;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            vy += gravity;
            y += vy;

            if (y > canvas.height - 20) {
                y = canvas.height - 20;
                vy *= bounce;
            }

            ctx.beginPath();
            ctx.arc(150, y, 20, 0, Math.PI * 2);
            ctx.fillStyle = 'skyblue';
            ctx.fill();
            requestAnimationFrame(draw);
        }

        draw();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ border: '1px solid white', backgroundColor: '#121212' }}
        />
    );
}

export default GravitySimulation;
