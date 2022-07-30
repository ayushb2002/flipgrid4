import { jsx as _jsx } from "react/jsx-runtime";
import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants } from "ethers";
import brownieConfig from "../brownie-config.json";
import mumbai from "../poly_mumbai.png";
import eth from "../eth.png";
import dai from "../fau.png";
import { YourWallet } from "./yourWallet/YourWallet";
export const Main = () => {
    // Show token values from the wallet
    // Get address of different tokens
    // Get the balance of the users
    // Send the brownie-config to our 'src' folder
    // Send the build folder 
    const {  activateBrowserWallet, account, deactivate,chainId  } = useEthers();


    const networkName = chainId ? helperConfig[chainId] : "dev";
    const WarrantyNFTAddress = chainId ? networkMapping[String(chainId)]["WarrantyNFT"][0] : constants.AddressZero;
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero;
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero;
    
    console.log('InMain',chainId)
    const supportedTokens = [
        {
            image: mumbai,
            address: WarrantyNFTAddress,
            name: "Matic"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        }
    ];
    //return (_jsx(YourWallet, { supportedTokens: supportedTokens }));
    return(<div></div>)
};
