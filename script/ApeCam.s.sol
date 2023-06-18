// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/ApeCam.sol";
import "forge-std/Script.sol";

contract ApeCamDeployScript is Script {
    address public tokenAddress;
    ApeCam apeCam;

    function run(address _tokenAddress) external returns (ApeCam) {
        if (block.chainid == 5) {
            uint256 deployerKey = vm.envUint("PRIVATE_KEY");
            tokenAddress = vm.envAddress("APE_ADDRESS");

            vm.startBroadcast(deployerKey);
            apeCam = new ApeCam(tokenAddress, 1e18);
            vm.stopBroadcast();
            return apeCam;
        }
        tokenAddress = _tokenAddress;
        vm.startBroadcast();
        apeCam = new ApeCam(tokenAddress, 1e18);
        vm.stopBroadcast();
        return apeCam;
    }
}
