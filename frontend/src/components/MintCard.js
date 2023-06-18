// src/components/MintCard.js

import React, {useEffect, useMemo} from 'react';

import {Player, useAssetMetrics, useCreateAsset} from '@livepeer/react';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import {TOO_MANY_FILES_REJECTION as createError} from "react-dropzone/src/utils";

// src/components/MintCard.js

import { ethers, formatEther, parseEther } from 'ethers';

const APE_CAM_ABI = require("../abi/ApeCam.json");
const APE_CAM_ADDRESS = "0x24d71cdc752845159c669177dc0c50163ec8a0fb";

export async function mintNFT(ipfsUrl) {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);
    // console.log(await contract.mint(await signer.getAddress(), "https://cf-ipfs.com/ipfs/bafybeigwempftbdsv5dltzzyplapf6pkaljqyffwplb5cj4ewhkcultgs4"));
    console.log(await contract.mint(await signer.getAddress(), ipfsUrl));

}

export async function queryNFTByOwner() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);
    console.log(await contract.getOwnedTokenIds(await signer.getAddress()));
}

export async function tokenUri(i) {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);
    return [await contract.ownerOf(i), formatEther(await contract.prevPrice(i)), await contract.tokenURI(i)];
}

export async function totalSupply() {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);
    console.log(await contract.totalSupply());
    return await contract.totalSupply();
}


export async function stealNFT() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(APE_CAM_ADDRESS, APE_CAM_ABI["abi"], signer);

    console.log(await contract.steal(2, parseEther("2")));
}

const APE_ABI_ERC = require("../abi/ERC20.json");
const APE_ADDRESS = "0x328507DC29C95c170B56a1b3A758eB7a9E73455c";

export async function mintApe() {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(APE_ADDRESS, APE_ABI_ERC["abi"], signer);
    console.log(await contract.mint(await signer.getAddress(), parseEther("3.0")));
}

export async function approveApe() {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(APE_ADDRESS, APE_ABI_ERC["abi"], signer);
    console.log(await contract.approve("0x24d71cdc752845159c669177dc0c50163ec8a0fb", parseEther("3.0")));
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
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={mintApe}>
                Mint APE
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={approveApe}>
                Approve APE
            </button>




        </div>
    );
};

export default MintCard;


export const Asset = () => {
    const [video, setVideo] = useState();
    const [ipfsHash, setIpfsHash] = useState("");
    useEffect(() => {
        console.log(ipfsHash);
    }, [ipfsHash]);
    const {
        mutate: createAsset,
        data: asset,
        status,
        progress,
        error,
    } = useCreateAsset(
        video
            ? {
                sources: [    {
                    name: video.name,
                    file: video,
                    storage: {
                        ipfs: true,
                        metadata: {
                            name: 'interesting video',
                            description: 'a great description of the video',
                        }
                    }
                }],
            }
            : null,
    );

    const { data: metrics } = useAssetMetrics({
        assetId: asset?.[0].id,
        refetchInterval: 30000,
    });

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
            setVideo(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'video/*': ['*.mp4'],
        },
        maxFiles: 1,
        onDrop,
    });

    const isLoading = useMemo(
        () =>
            status === 'loading' ||
            (asset?.[0] && asset[0].status?.phase !== 'ready'),
        [status, asset],
    );

    const progressFormatted = useMemo(
        () =>
            progress?.[0].phase === 'failed'
                ? 'Failed to process video.'
                : progress?.[0].phase === 'waiting'
                    ? 'Waiting...'
                    : progress?.[0].phase === 'uploading'
                        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
                        : progress?.[0].phase === 'processing'
                            ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
                            : null,
        [progress],
    );
    useEffect(() => {
        if(asset?.[0] && asset[0].status?.phase === 'ready'){
            console.log(asset)
            setIpfsHash(asset[0].storage?.ipfs?.gatewayUrl)
            console.log(asset[0].storage?.ipfs?.gatewayUrl)
            console.log(asset[0].storage?.ipfs)
            console.log(asset[0].storage)
            console.log(ipfsHash)
        }
    }, [asset])

    return (
        <div className="container mx-auto px-4">
            {!asset && (
                <div {...getRootProps()} className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg">
                    <input {...getInputProps()} />
                    <p className="text-gray-700">Drag and drop or browse files</p>

                    {error?.message && <p className="text-red-500">{error.message}</p>}
                </div>
            )}

            {asset?.[0]?.playbackId && (
                <Player title={asset[0].name} playbackId={asset[0].playbackId} className="mt-4" />
            )}

            <div className="container mx-auto px-4 flex flex-col items-center justify-center">
                {metrics?.metrics?.[0] && (
                    <p className="text-green-600">Views: {metrics?.metrics?.[0]?.startViews}</p>
                )}

                {video ? <p className="text-gray-600">{video.name}</p> : <p className="text-gray-600 flex items-center justify-center">Select a video file to upload.</p>}

                {progressFormatted && <p className="text-blue-600">{progressFormatted}</p>}

                {!asset?.[0].id && (
                    <button
                        onClick={() => {
                            createAsset?.();
                        }}
                        disabled={isLoading || !createAsset}
                        className={`mt-4 py-2 px-4 rounded text-white flex items-center justify-center ${isLoading || !createAsset ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700 flex items-center justify-center"}`}
                    >
                        Upload
                    </button>
                )

                }
            </div>
            {asset?.[0]?.status?.phase === 'ready' && (
                <div className="mt-4 flex justify-center items-center">
                    <button
                        onClick={() => {
                            mintNFT(ipfsHash);
                        }}
                        disabled={isLoading || !createAsset}
                        className={`mt-4 py-2 px-4 rounded text-white flex items-center justify-center ${isLoading || !createAsset ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700 flex items-center justify-center"}`}
                    >
                        Mint
                    </button>
                </div>
            )
                        }
        </div>
    );

};
