// src/components/Navbar.js

import { ethers } from 'ethers';
import React, { useState } from 'react';

const Navbar = () => {
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                                
                console.log(`Connected to account ${await signer.getAddress()}`);

                setConnected(true);
            } catch (error) {
                console.error(`Failed to connect to wallet: ${error}`);
                setConnected(false);
                setAccount('');
            }
        } else {
            console.log('Ethereum browser extension like Metamask is needed to use this dApp');
            setConnected(false);
            setAccount('');
        }
    };

    return (
        <nav className="flex items-center justify-between p-6 bg-blue-500">
            <div className="text-white text-2xl">
                ApeCam
            </div>
            <div>
                {!connected && <button className="bg-white text-blue-500 px-4 py-2 rounded mr-4" onClick={connectWallet}>
                    {connected ? 'Connected' : 'Connect'}
                </button>}
                {connected && <span className="text-white">Wallet: {account}</span>}
            </div>
        </nav>
    );
};

export default Navbar;
