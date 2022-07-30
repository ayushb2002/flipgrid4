import { jsx as _jsx } from "react/jsx-runtime";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { Button, makeStyles } from "@material-ui/core";
// const useStyles = makeStyles((theme))
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContents: "flex-end",
        gap: theme.spacing(1)
    }
}));
export const Header = () => {
    const classes = useStyles();
    const { activateBrowserWallet, account, deactivate,chainId } = useEthers();
    console.log('InH',account)
    const tokenBalance = useTokenBalance("0x0000000000000000000000000000000000001010","0x133aFe86B6cB9fEc747A45e1420F50db6149947a");
    
    const isConnected = account !== undefined;
    return (_jsx("div", Object.assign({ className: classes.container }, { children: _jsx("div", { children: isConnected ? (_jsx(Button, Object.assign({ color: "primary", variant: "contained", onClick: deactivate }, { children: "Disconnect" }))) : (_jsx(Button, Object.assign({ color: "primary", variant: "contained", onClick: () => activateBrowserWallet() }, { children: "Connect" }))) }) })));
};
