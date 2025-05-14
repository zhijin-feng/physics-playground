import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Simulation from './pages/Simulation.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulation" element={<Simulation />} />
        </Routes>
    );
}

export default App;
