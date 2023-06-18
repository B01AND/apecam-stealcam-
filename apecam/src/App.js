// src/App.js

import React from 'react';
import Navbar from './components/Navbar';
import MintCard from './components/MintCard';
import DummyCard from './components/DummyCard';
import GetApeCard from './components/GetApeCard';

const App = () => {
    return (
        <div>
            <Navbar />
            <MintCard />
            <GetApeCard />
            <div className="grid grid-cols-1">
                {[...Array(8)].map((_, i) => <DummyCard key={i} />)}
            </div>
        </div>
    );
};

export default App;
