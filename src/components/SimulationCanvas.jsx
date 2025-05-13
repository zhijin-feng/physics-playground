import React, { useRef, useEffect } from 'react';

function SimulationCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 画一个测试用的圆
        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'skyblue';
        ctx.fill();
    }, []);

    return <canvas ref={canvasRef} width={500} height={500} />;
}

export default SimulationCanvas;
