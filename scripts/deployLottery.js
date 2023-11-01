/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js');

async function main() {

    // const accounts = await ethers.getSigners()
    // const contractOwner = accounts[0]

    // We get the contract to deploy
    const Lottery = await ethers.getContractFactory('LotteryUserFacet');
    console.log('Deploying LotteryUserFacet...');
    const lottery = await Lottery.deploy();
    await lottery.deployed();
    console.log('Lottery deployed to:', lottery.address);

    // Deploy facets and set the `facetCuts` variable
    console.log('')
    console.log('Deploying facets')
    const FacetNames = [
        'LotteryAdminFacet',
        'LotteryUserFacet'
    ]
    // The `facetCuts` variable is the FacetCut[] that contains the functions to add during diamond deployment
    const facetCuts = []
    for (const FacetName of FacetNames) {
        const Facet = await ethers.getContractFactory(FacetName)
        const facet = await Facet.deploy()
        await facet.deployed()
        console.log(`${FacetName} deployed: ${facet.address}`)

        facetCuts.push({
            facetAddress: facet.address,
            action: FacetCutAction.Add,
            functionSelectors: getSelectors(facet)
        })
        console.log(facetCuts);
    }

    const diamond = await ethers.getContractAt("IDiamondCut", "0xBa0ad3444cBA5a5a3EA7636B8d524B7193c9b0B1");
    await diamond.diamondCut(facetCuts, '0x0000000000000000000000000000000000000000', []);
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });