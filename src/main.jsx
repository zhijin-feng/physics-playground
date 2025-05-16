import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 新增
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter> {/* 👈 用 Router 包裹 App */}
            <App />
        </BrowserRouter>
    </StrictMode>,
);

// console.log('OpenAI API Key:', import.meta.env.VITE_OPENAI_API_KEY ? '✅ Loaded' : '❌ Missing'); 测试openAI key是否配置成功;
