// src/App.js

import React from 'react';
import Navbar from './components/Navbar';
import MintCard from './components/MintCard';
import DummyCard from './components/DummyCard';

const App = () => {
    return (
        <div>
            <Navbar />
            <MintCard />
            <div className="grid grid-cols-1">
                {[...Array(8)].map((_, i) => <DummyCard key={i} />)}
            </div>
        </div>
    );
};

export default App;
