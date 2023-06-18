// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/ApeCam.sol";
import "forge-std/Script.sol";

contract ApeCamDeployScript is Script {
    address public tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function run() external returns (ApeCam) {
        vm.startBroadcast();
        ApeCam apeCam = new ApeCam(tokenAddress, 1e18);
        vm.stopBroadcast();
        return apeCam;
    }
}
