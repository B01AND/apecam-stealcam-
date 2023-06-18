// src/components/MintCard.js

import { ethers, formatEther, parseEther } from 'ethers';
import React from 'react';

const APE_CAM_ABI = require("../abi/ApeCam.json");
const APE_CAM_ADDRESS = "0x24d71cdc752845159c669177dc0c50163ec8a0fb";

export async function mintNFT() {

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);
  console.log(await contract.mint(await signer.getAddress(), "https://cf-ipfs.com/ipfs/bafybeigwempftbdsv5dltzzyplapf6pkaljqyffwplb5cj4ewhkcultgs4"));
}

export async function queryNFTByOwner() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);
  console.log(await contract.getOwnedTokenIds(await signer.getAddress()));
}

export async function tokenUri() {

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);
  console.log("owner: ", await contract.ownerOf(0));
  console.log("previous price: ", formatEther(await contract.prevPrice(0)));
  console.log(await contract.tokenURI(0));
}

export async function totalSupply() {

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);
  console.log(await contract.totalSupply());
}


export async function stealNFT() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);

  console.log(await contract.steal(0, parseEther("5.0")));
}

const MintCard = () => {
    return (
        <div className="m-4 p-6 bg-gray-200 rounded">
            <button className="bg-blue-500 text-white px-4 py-2 mb-2 rounded">
                Upload Files
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={mintNFT}>
                Mint
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={stealNFT}>
                Steal
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={tokenUri}>
               TokenURI 
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={queryNFTByOwner}>
              queryNFTByOwner 
            </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={totalSupply}>
             totalSupply 
            </button>



      
        </div>
    );
};

export default MintCard;
