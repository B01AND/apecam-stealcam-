// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/HistoryCam.sol";
import "forge-std/Script.sol";

contract HistoryCamDeployScript is Script {
    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    uint256 public deployerKey;

    function run() external returns (HistoryCam) {
        if (block.chainid == 31337) {
            deployerKey = DEFAULT_ANVIL_PRIVATE_KEY;
        } else {
            deployerKey = vm.envUint("PRIVATE_KEY");
        }
        vm.startBroadcast(deployerKey);

        HistoryCam historyCam = new HistoryCam();

        vm.stopBroadcast();
        return historyCam;
    }
}
