# Sentinel: Smart Contracts

Sentinel is a community-owned and governed EVM Optimistic Oracle using decentralized and trustless system designed to provide accurate and reliable data feeds to Ethereum Virtual Machine (EVM) applications. This oracle leverages the principles of optimism, allowing developers to efficiently and securely access off-chain information without sacrificing the benefits of decentralization.

Using this model, the community collectively governs the oracle, making decisions about data sources, consensus mechanisms, and protocol upgrades. This ensures that no single entity has control over the oracle, promoting transparency and preventing manipulation. The governance process typically involves token holders who can vote on proposals and changes, ensuring a fair and inclusive decision-making process.

By being community-owned and governed, this EVM Optimistic Oracle eliminates the need for a centralized authority or third-party intermediaries. It promotes the values of decentralization, transparency, and security, allowing developers to build innovative applications on the Ethereum network with reliable and up-to-date external data.

## Getting Started

### Prerequisites

To build the Sentinel smart contracts, you will need the following:

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

| **Contract**                                           | **Description**                                                                                                                                                                                                                                                        |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`stakingAdapter`](contracts/stakingAdapter.sol)       | The entry point for managing protocol participants(data providers & disputers) stakes. Their stakes ensure security and data validity through financial incentives and penalties. It handles the logic for of the staking, as well as liquidations and redemptions.    |
| [`SNT-Token`](contracts/SNT.sol)                       | An ERC-20 token designed to be the governance token of the protocol for voting on proposals.                                                                                                                                                                           |
| [`stSNT-Token`](contracts/stSNT.sol)                   | An ERC-20 token designed to be the staking token of the protocol which is issued to protocol participants when they stake to represent their share during redemptions.                                                                                                 |
| [`aggregatorAdapter`](contracts/aggregatorAdapter.sol) | This contract manages the aggregation of various data sent by providers using an optimal data validity threshhold that is decided by the protocol. It also tracks the invalid data sent by providers based on a deviation threshhold to record invalid data providers. |
| [`disputeAdapter`](contracts/disputeAdapter.sol)       | Disputes that arise from data providers and data feed consumers are settled by this contract and it issues rewards/penalties records to the [stakingAdapter](contracts/stakingAdapter.sol) contract .                                                                  |
| [`oracleAdapter`](contracts/oracleAdapter.sol)         | Servers asset that have been aggregated by the [`aggregationAdapter`](contracts/aggregationAdapter.sol) contract.This is the entry point for all data feed consumers.                                                                                                  |
| [`proposalAdapter`](contracts/proposalAdapter.sol)     | This contract handles all proposals to the protocol i.e deviation threshhold, new data provider, aggregation metrics.                                                                                                                                                  |

![Oracle Flow Chart](/ff8509a8-d6fc-4d6d-978f-57a937ca0089.png) |

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
