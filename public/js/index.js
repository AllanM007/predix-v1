import { ethers } from "./ethers.js";
const collateralAdapter = "0x110b1e1eA903063553869E43750Cf30F7D9B42Ea";
const oracleAddress = "0x614bD1Db7d6C1Ad3d43caD5d6C6112F428c979fD";

const collateralAdapterABI = require([
  "./artifacts/contracts/collateralAdapter.sol/CollateralAdapter.json",
]);
const oracleContractABI = require([
  "./artifacts/contracts/oraclePriceFeed.sol/APIConsumer.json",
]);

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

// Collateral Contract
const collateralAdapterContract = new ethers.Contract(
  collateralAdapter,
  collateralAdapterABI.abi,
  signer
);

// Oracle Contract
const oracleContract = new ethers.Contract(
  oracleAddress,
  oracleContractABI.abi,
  signer
);

async function valueCollateral() {
  const gas_limit = "0x100000";
  const gasPrice = await provider.getGasPrice();

  // Sending Matic to an address
  const sendCollateraltx = {
    from: account,
    to: "0x391E3567e8Da8018f592e1855A4459629c0E1d8A",
    value: sendVal,
    nonce: provider.getTransactionCount(account, "latest"),
    gasLimit: ethers.utils.hexlify(gas_limit), // 100000
    gasPrice: ethers.utils.hexlify(gasPrice),
  };

  const collateralPrice = await oracleContract.price();

  const fmtCollateralPrice = collateralPrice.toString();

  console.log(fmtCollateralPrice);

  const collateralTransfer = await signer.sendTransaction(sendCollateraltx);

  const collateralTransferTx = await collateralTransfer.wait();

  if (collateralTransferTx.status == 1) {
    try {
      const collateralValuation =
        await collateralAdpaterContract.collateralValuation(account, sendVal);

      const collateralValuationTx = await collateralValuation.wait();

      console.log(collateralValuationTx);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("collateral transaction not succesful");
  }
}

valueCollateral();
