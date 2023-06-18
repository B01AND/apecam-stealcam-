// src/components/DummyCard.js

import React from 'react';

const DummyCard = () => {
    return (
        <div className="m-4 p-6 bg-gray-200 rounded">
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="mb-4"/>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Button
            </button>
        </div>
    );
};

export default DummyCard;
