/* global ethers */
/* eslint prefer-const: "off" */

const { FacetCutAction, getSelector } = require('./libraries/diamond.js');

async function main() {

    const diamondAddress = '0xBa0ad3444cBA5a5a3EA7636B8d524B7193c9b0B1';
    const loupe = await ethers.getContractAt("DiamondLoupeFacet", diamondAddress);
    
    // console.log(await loupe.facetAddress("0xf2c9ecd8"));

    facetAddress = await loupe.facetAddress("0xf2c9ecd8");

    const facetCuts = []
    facetCuts.push({
        facetAddress: "0x765A99cDb831191BC3553922dB2B75f67C769870",
        action: FacetCutAction.Replace,
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