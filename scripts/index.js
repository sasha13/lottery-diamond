// scripts/index.js
async function main() {
    // Retrieve accounts from the local node
    let accounts = await ethers.getSigners();
    // console.log(accounts);

    // Set up an ethers contract, representing our deployed Diamond facet
    const address = '0xBa0ad3444cBA5a5a3EA7636B8d524B7193c9b0B1';
    const lottery = await ethers.getContractAt("LotteryUserFacet", address);
    const res = await lottery.getNumber();
    console.log(res.toString());


    // lottery.sendEntryRequest({ from: accounts[1], value: ethers.utils.parseEther("0.5") });

    // await lottery.connect(accounts[1]).sendEntryRequest({ value: ethers.utils.parseEther("0.5") })
    // await lottery.connect(accounts[2]).sendEntryRequest({ value: ethers.utils.parseEther("0.5") })
    // await lottery.connect(accounts[3]).sendEntryRequest({ value: ethers.utils.parseEther("0.5") })

    // const proceedings = await ethers.provider.getBalance(address);
    // console.log('proceedings: ' + proceedings);

    // const tx = await lottery.pickWinner();
    // const res = await tx.wait();
    // console.log(res);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


// napravi samo f-ju koja vraca hardcode-ovan broj
// posle izmeni da prima broj kao arg i vraca ga