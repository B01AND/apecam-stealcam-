// src/components/MintCard.js

import React from 'react';

const MintCard = () => {
    return (
        <div className="m-4 p-6 bg-gray-200 rounded">
            <button className="bg-blue-500 text-white px-4 py-2 mb-2 rounded">
                Upload Files
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Mint
            </button>
        </div>
    );
};

export default MintCard;
