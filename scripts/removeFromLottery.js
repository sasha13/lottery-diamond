/* global ethers */
/* eslint prefer-const: "off" */

const { FacetCutAction, getSelector } = require('./libraries/diamond.js');

async function main() {

    const diamondAddress = '0xBa0ad3444cBA5a5a3EA7636B8d524B7193c9b0B1';
    const loupe = await ethers.getContractAt("DiamondLoupeFacet", diamondAddress);
    // console.log(await loupe.facetFunctionSelectors("0xd929ae2A141176381C28032ac43A3a1365e41069"));
    // console.log(await loupe.facetAddress("0xf2c9ecd8"));
    console.log(await loupe.facets());

    facetAddress = await loupe.facetAddress("0xf2c9ecd8");

    const facetCuts = []
    facetCuts.push({
        // only for delete the address should be zero address
        facetAddress: "0x0000000000000000000000000000000000000000",
        action: FacetCutAction.Remove,
        functionSelectors: ["0xf2c9ecd8"]
    })

    const diamond = await ethers.getContractAt("IDiamondCut", diamondAddress);
    await diamond.diamondCut(facetCuts, '0x0000000000000000000000000000000000000000', []);
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });