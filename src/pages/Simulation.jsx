import { useState } from 'react';
import GravitySimulation from '../components/simulations/GravitySimulation';

function SimulationPage() {
    const [activeSim, setActiveSim] = useState('gravity');

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '200px', backgroundColor: '#1e1e1e', padding: '1rem' }}>
                <h2 style={{ color: 'white' }}>Simulations</h2>
                <button onClick={() => setActiveSim('gravity')}>Gravity Simulation</button>
            </div>

            <div style={{ flexGrow: 1, padding: '1rem' }}>
                {activeSim === 'gravity' && <GravitySimulation />}
            </div>
        </div>
    );
}

export default SimulationPage;
