import { ethers } from "ethers";
import "dotenv/config";
import * as nftJson from "";

async function main() {
    const signer = await connectToBlockchain();

    const nftFactory = new ethers.ContractFactory(
        nftJson.abi,
        nftJson.bytecode,
        signer
    );

    const contract = await nftFactory.deploy();


    await contract.deployed();


    for (let i = 0; i < 11; i++) {
        await contract.mint(signer.address);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// ###############################

async function connectToBlockchain() {
    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY as ethers.utils.BytesLike
    );



    const provider = ethers.providers.getDefaultProvider("ropsten");

    const signer = await wallet.connect(provider);
    const balanceBN = await signer.getBalance();
    const balance = Number(ethers.utils.formatEther(balanceBN));

    if (balance < 0.01) {
        throw new Error("Not enough ether");
    }

    return signer;
}