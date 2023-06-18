import React from 'react';

const DummyCard = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="m-4 p-6 bg-gray-200 rounded flex items-center justify-center flex-col max-w-md">
                <video controls src="https://cf-ipfs.com/ipfs/bafybeigwempftbdsv5dltzzyplapf6pkaljqyffwplb5cj4ewhkcultgs4" className="mb-4 max-h-64"/>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Button
                </button>
            </div>
        </div>
    );
};

export default DummyCard;
