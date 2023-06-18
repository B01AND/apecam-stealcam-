// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/StdUtils.sol";
import "../src/ApeCam.sol";
import "../script/ApeCam.s.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract ApeCamTest is StdCheats, Test {
    ApeCam public apeCam;
    ApeCamDeployScript public deployer;
    address public deployerAddress;
    address alice;
    address bob;
    ERC20 apeCoin;

    function setUp() public {
        apeCoin = new ERC20("ApeCoin", "APE");
        deployer = new ApeCamDeployScript();
        apeCam = deployer.run(address(apeCoin));

        alice = makeAddr("alice");
        bob = makeAddr("bob");

        deal(alice, 1 ether);
        deal(bob, 1 ether);
        deal(address(apeCoin), bob, 2e18);
        deal(address(apeCoin), alice, 1e18);
    }

    function testMint() public {
        vm.prank(alice);
        apeCam.mint(alice, "random_token_uri");
        assertEq(apeCam.balanceOf(alice), 1);
    }

    function testMintTwice() public {
        vm.startPrank(alice);
        apeCam.mint(alice, "uri1");
        vm.expectRevert();
        apeCam.mint(alice, "uri2");
        vm.stopPrank();
    }

    function testSteal() public {
        vm.prank(alice);
        apeCam.mint(alice, "uri1");

        vm.startPrank(bob);
        apeCoin.approve(address(apeCam), 2e18);
        apeCam.steal(0, 2e18);
        vm.stopPrank();

        assertEq(apeCam.balanceOf(bob), 1);
        assertEq(apeCoin.balanceOf(alice), 3e18);

        vm.startPrank(alice);
        apeCoin.approve(address(apeCam), 3e18);
        apeCam.steal(0, 3e18);
        vm.stopPrank();

        assertEq(apeCam.balanceOf(alice), 1);
        assertEq(apeCoin.balanceOf(bob), 3e18);
    }
}
