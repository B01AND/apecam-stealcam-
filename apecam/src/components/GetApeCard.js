// src/components/GetApeCard.js

import { ethers, parseEther } from 'ethers';
import React from 'react';
const APE_ABI = require("../abi/ERC20.json");
const APE_ADDRESS = "0x328507DC29C95c170B56a1b3A758eB7a9E73455c";

export async function mintApe() {

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(APE_ADDRESS, APE_ABI["abi"], signer);
  console.log(await contract.mint(await signer.getAddress(), parseEther("3.0")));
}

export async function approveApe() {

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  
  const contract = new ethers.Contract(APE_ADDRESS, APE_ABI["abi"], signer);
  console.log(await contract.approve("0x24d71cdc752845159c669177dc0c50163ec8a0fb", parseEther("3.0")));
}


const GetApeCard = () => {
    return (
        <div className="m-4 p-6 bg-gray-200 rounded">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={mintApe}>
              Mint APE
            </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={approveApe}>
              Approve APE
            </button>

        </div>
    );
};

export default GetApeCard;
