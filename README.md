# Predix: Smart Contracts

Predix is a prediction market that leverages Chainlink core products to ensure data integrity, smart contract execution and speed.

Predix utilizes chainlink data feeds as data sources that users can predict on their future performance. Predix uses Chainlink's Feed Registry to dynamically fetch price feeds using a single contract to allow for as many data feeds as possible to be available to users.

Predix uses chainlink's automation contracts to execute rewards/markets finalization based on data feed changes or expiry periods. This allows the protocol to execute securely and in a deterministic manner which ensures secure prediction market outcomes.

## Getting Started

### Prerequisites

To build the Predix smart contracts, you will need the following:

- [Solidity](https://docs.soliditylang.org/en/v0.8.19/installing-solidity.html)
- [Hardhat](https://hardhat.org/)
- [Node.js](https://nodejs.org/en/)
- [solhint](https://github.com/protofire/solhint)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository with its submodules, set up
[Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#quick-startstallation), and install the dependencies via npm:

```bash
npm install
```

<!--
### Testing

To run the tests, run the following command:

```bash
forge test
```

### Static Analysis

To run the Slither static analysis tool, run the following command:

```bash
slither .
``` -->

## Contracts

### Core Contracts

| **Contract**                                             | **Description**                                                                                                                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`oracleFeedRegistry`](contracts/oracleFeedRegistry.sol) | This contract dynamically fetches chainlink oracle price data feeds and provides them for users when creating positions.                                                         |
| [`positionsFactory`](contracts/positionsFactory.sol)     | This contract manages position creation/proposals/opposals and liquidations.                                                                                                     |
| [`automationFactory`](contracts/automationFactory.sol)   | This contract manages the positions automation using chainlink's automation module to facilitate price feeds monitoring and calling liquidations/closing positions.              |
| [`upKeepRegistry`](contracts/upKeepRegistry.sol)         | This is a chainlink upkeep contract that manages the chainlink [`automationFactory`](contracts/automationFactory.sol) contract to make sure it is funded and executes correctly. |

![Predix Flow Chart](/ff8509a8-d6fc-4d6d-978f-57a937ca0089.png) |

<!-- | [`TellorPriceOracle`](contracts/Oracles/TellorPriceOracle.sol)           | Tellor oracle integration contract.                                                                                                                                                                                                                                                                                                                                                                                                     |

### Periphery Contracts

| **Contract**                                                 | **Description**                                                                                                                                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`PositionManagerStETH`](contracts/PositionManagerStETH.sol) | Allows managing positions with ETH or stETH collateral. Responsible for wrapping/unwrapping ETH and stETH into/from wstETH. It has to be whitelisted by a user in `PositionManager`. |
| [`OneStepLeverage`](contracts/OneStepLeverage.sol)           | Facilitates opening, closing, or adjusting leverage on wstETH positions with a single transaction, employing flash mint to streamline the process and reduce transaction complexity. |
| [`OneStepLeverageStETH`](contracts/OneStepLeverageStETH.sol) | Extends the functionality of `OneStepLeverage` to allow using ETH and stETH.                                                                                                         |
| [`FlashMintLiquidator`](contracts/FlashMintLiquidator.sol)   | Facilitates the liquidation of undercollateralized positions in a single transaction, employing flash loans to streamline the process.                                               |
| [`ParaSwapAMM`](contracts/AMMs/ParaSwapAMM.sol)              | ParaSwap integration contract. Can be used by `OneStepLeverage`, `OneStepLeverageStETH` and `FlashMintLiquidator`.                                                                   |
| [`BalancerAMM`](contracts/AMMs/BalancerAMM.sol)              | Balancer integration contract. Can be used by `OneStepLeverage`, `OneStepLeverageStETH` and `FlashMintLiquidator`.                                                                   | -->
