// src/App.js

import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import MintCard, {Asset, CreateAndViewAsset, tokenUri, totalSupply} from './components/MintCard';
import DummyCard from './components/DummyCard';
import {
    LivepeerConfig,
    createReactClient,
    studioProvider,
} from '@livepeer/react';
import GetApeCard from "./components/getApeCard";

const livepeerClient = createReactClient({
    provider: studioProvider({
        apiKey: "6b6fb4d4-0eb3-4d0c-9974-9a7112868906",
    }),
});
const App = () => {
    const [totalSupplyNumber, setTotalSupply] = useState(0);
    const [tokenData, setTokenData] = useState([]);

    useEffect(() => {
            const totalSupplies = async()=>{
                const totalSupplies = await totalSupply()
                setTotalSupply(Number(totalSupplies))
                console.log(Number(totalSupplies))
            }
        totalSupplies()
        },[]
    )
    const getTokenData = async (index) => {
        const [ownerAddress, previousPrice, tokenURI] = await tokenUri(index);
        console.log('ownerAddress:', ownerAddress);
        console.log('previousPrice:', previousPrice);
        console.log('tokenURI:', tokenURI);
        return { ownerAddress, previousPrice, tokenURI };
    }
    useEffect(() => {
        const fetchTokenData = async () => {
            const data = [];
            for (let i = 0; i < totalSupplyNumber; i++) {
                const tokenInfo = await getTokenData(i);
                data.push(tokenInfo);
                console.log(tokenInfo)
            }
            setTokenData(data);
        };
        if (totalSupplyNumber > 0) {
            fetchTokenData();
        }
    }, [totalSupplyNumber]);

    if (!tokenData) return <div>Loading...</div>;
    return (
        <LivepeerConfig client={livepeerClient}>
            <Navbar />
            <MintCard />
            <Asset/>
            <div className="grid grid-cols-1">
                {tokenData.map((data, i) =>
                    <DummyCard
                        key={i}
                        ownerAddress={data.ownerAddress}
                        previousPrice={data.previousPrice}
                        tokenURI={data.tokenURI}
                    />
                )}
            </div>
        </LivepeerConfig>
    );
};

export default App;
