// src/App.js

import React from 'react';
import Navbar from './components/Navbar';
import MintCard, {Asset, CreateAndViewAsset} from './components/MintCard';
import DummyCard from './components/DummyCard';
import {
    LivepeerConfig,
    createReactClient,
    studioProvider,
} from '@livepeer/react';

const livepeerClient = createReactClient({
    provider: studioProvider({
        apiKey: "6b6fb4d4-0eb3-4d0c-9974-9a7112868906",
    }),
});
const App = () => {
    return (
        <LivepeerConfig client={livepeerClient}>
            <Navbar />
            <MintCard />
            <Asset/>
            <div className="grid grid-cols-1">
                {[...Array(8)].map((_, i) => <DummyCard key={i} />)}
            </div>
        </LivepeerConfig>
);
};

export default App;
