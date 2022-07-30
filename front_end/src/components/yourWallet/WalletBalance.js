import { jsx as _jsx } from "react/jsx-runtime";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { BalanceMsg } from "../BalanceMsg";
export const WalletBalance = ({ token }) => {
    const { address, image, name } = token;
    const {  activateBrowserWallet, account, deactivate,chainId  } = useEthers();
    const tokenBalance = useTokenBalance(address,account);

    // console.log(tokenBalance);
    //console.log(account);
    //console.log(token);
    const formattedTokenBalance = '0';//tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0;
    //alert('hahahah')

    return (_jsx(BalanceMsg, { label: `Your un-staked ${name} balance`, tokenImgSrc: image, amount: formattedTokenBalance }));
};
