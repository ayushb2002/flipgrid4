import { ChainId, DAppProvider } from '@usedapp/core';
import { jsx as _jsx } from "react/jsx-runtime";
import { Header } from "../components/header" ;
import { Container} from "@material-ui/core" ;
import { Main } from "../components/main";
import { ethers } from 'ethers';
import { useEthers, useTokenBalance } from "@usedapp/core";


import helperConfig from "../helper-config.json";
import networkMapping from "../chain-info/deployments/map.json";
import { constants } from "ethers";
import brownieConfig from "../brownie-config.json";
import mumbai from "../poly_mumbai.png";
import eth from "../eth.png";
import dai from "../fau.png";

export const MyWallet =() =>{
  
    return (
      <>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <div style={{display:'flex'}}>
      <div style={{width:'400px'}}></div>
        <Header />
        <Container maxWidth="md">
       

        
        </Container>
        </div>
      
      </>
  );
    
}
