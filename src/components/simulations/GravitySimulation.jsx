import { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../../styles/simulation.css';

function GravitySimulation() {
    const canvasRef = useRef(null);
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 🎯 Gravity simulation animation
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

    // 🤖 Call DeepSeek API (streaming)
    const handleExplain = async () => {
        setLoading(true);
        setError('');
        setExplanation('');

        try {
            const res = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        {
                            role: 'user',
                            content:
                                'Explain this gravity simulation clearly ' +
                                'The simulation shows a ball falling due to gravity and bouncing when it hits the ground. ' +
                                'Write in markdown. Keep it beginner-friendly and concise.'
                        },
                    ],
                    stream: true,
                    max_tokens: 1000,
                }),
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let fullText = '';  // 用于累积所有流数据

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter((line) => line.trim() !== '');
                for (const line of lines) {
                    if (line.startsWith('data:')) {
                        const json = line.replace(/^data:\s*/, '');
                        if (json === '[DONE]') break;

                        try {
                            const parsed = JSON.parse(json);
                            const token = parsed.choices?.[0]?.delta?.content;
                            if (token) {
                                fullText += token;
                            }
                        } catch (e) {
                            console.error('Streaming parse error:', e);
                        }
                    }
                }
            }

            // 清除 ```markdown 和 ``` 代码块标记，并去除末尾word count
            const cleaned = fullText
                .replace(/^```markdown\s*/, '')
                .replace(/```$/, '')
                .replace(/\(Word count:.*\)$/m, '');

            setExplanation(cleaned);

        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 监听 explanation 变化，可选打印调试
    useEffect(() => {
        console.log('Explanation updated:', explanation);
    }, [explanation]);

    return (
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            {/* 🎨 Canvas area */}
            <canvas
                ref={canvasRef}
                width={600}
                height={500}
                style={{
                    border: '1px solid white',
                    backgroundColor: '#121212',
                    borderRadius: '10px',
                }}
            />

            {/* 📘 AI explanation panel */}
            <div className="sim-ai-answer-panel">
                <button onClick={handleExplain} className="sim-ai-button" disabled={loading}>
                    {loading ? 'Generating explanation...' : 'AI Assistant'}
                </button>

                {error && <div style={{ color: 'red' }}>{error}</div>}

                <div style={{ flexGrow: 1 }} className="sim-ai-markdown">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{explanation}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default GravitySimulation;
