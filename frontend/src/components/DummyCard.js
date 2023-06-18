import React, {useEffect, useState} from 'react';
import {stealNFT} from "./MintCard";
import {ethers} from "ethers";

const DummyCard =  ({ownerAddress, previousPrice, tokenURI}) => {
    const [ensName, setEnsName] = useState('');
    useEffect(() => {
        const fetchENSName = async () => {
            // Assuming you have a provider setup
            const provider = new ethers.BrowserProvider(window.ethereum);

            try {
                const ensName = await provider.lookupAddress(ownerAddress);
                console.log("edison",ensName);
                setEnsName(ensName);
            } catch (error) {
                console.error('Error fetching ENS name: ', error);
            }
        };

        fetchENSName();
    }, [ownerAddress]);
    if(tokenURI === undefined) { tokenURI=("https://cf-ipfs.com/ipfs/bafybeifokotcwvri6mqejleswtq3667zrznkoj4byk3uw27oju5hbmkpcy")}
    console.log(ownerAddress, previousPrice, tokenURI)
    return (
        <div className="flex justify-center items-center">
            <div className="m-4 p-6 bg-gray-200 rounded flex items-center justify-center flex-col max-w-md">
                <video controls src={`${tokenURI}`} className="mb-4 max-h-64"/>
                <div>Owner: {ensName ? ensName : ownerAddress}</div>
                <div>Previous Price: {previousPrice}</div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={stealNFT}>
                    Steal 🕵
                </button>
            </div>
        </div>
    );
};

export default DummyCard;
