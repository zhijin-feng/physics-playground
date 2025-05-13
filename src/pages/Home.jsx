import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Physics Playground</h1>
            <p>欢迎来到物理模拟平台！</p>
            <Link to="/simulation">
                <button>进入模拟页面</button>
            </Link>
        </div>
    );
}

export default Home;
