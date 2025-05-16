import { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import '../../styles/simulation.css'; // 可选：用于局部样式

function GravitySimulation() {
    const canvasRef = useRef(null);
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    const handleExplain = async () => {
        setLoading(true);
        setError('');
        setExplanation('');
        try {
            const res = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        {
                            role: 'user',
                            content: 'Please explain gravity simulation.',
                        },
                    ],
                }),
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content;
            setExplanation(reply || 'No return');
        } catch (err) {
            setError(`Error：${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            {/* Canvas 区域 */}
            <canvas
                ref={canvasRef}
                width={600}
                height={500}
                style={{ border: '1px solid white', backgroundColor: '#121212', borderRadius: '10px' }}
            />

            {/* 右侧讲解区域 */}
            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#1e1e1e',
                color: '#f0f0f0',
                borderRadius: '10px',
                padding: '1rem',
                overflowY: 'auto',
                height: '500px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <button
                    onClick={handleExplain}
                    style={{
                        marginBottom: '1rem',
                        backgroundColor: '#4e80ff',
                        border: 'none',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        alignSelf: 'flex-start'
                    }}
                >
                    {loading ? 'Explaining...' : 'AI Assistant'}
                </button>

                {error && <div style={{ color: 'red' }}>{error}</div>}

                <div style={{ flexGrow: 1 }}>
                    <ReactMarkdown>{explanation}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default GravitySimulation;
