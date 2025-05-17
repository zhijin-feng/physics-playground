import { useRef, useEffect } from 'react';
import '../../styles/simulation.css';

function NonNewtonianFluidSimulation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 清空画布，给个暗色背景
        ctx.fillStyle = '#121212';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 以后这里写非牛顿流体的渲染逻辑

    }, []);

    return (
        <div style={{ padding: '1rem' }}>
            <canvas
                ref={canvasRef}
                width={600}
                height={500}
                style={{
                    border: '1px solid white',
                    borderRadius: '10px',
                    backgroundColor: '#121212',
                }}
            />
        </div>
    );
}

export default NonNewtonianFluidSimulation;
