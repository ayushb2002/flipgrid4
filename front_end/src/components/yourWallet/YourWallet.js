import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@material-ui/core';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Tab } from "@material-ui/core";
import { WalletBalance } from "./WalletBalance";
export const YourWallet = ({ supportedTokens }) => {
    const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
    const handleChange = (event, newValue) => {
        setSelectedTokenIndex(parseInt(newValue));
    };


    return (_jsxs(Box, {
        children: [_jsx("h1", { children: " Your Wallet! " }), _jsx("div", { children: "I'm Your Wallet!!" }), _jsx(Box, {
            children: _jsxs(TabContext, Object.assign({ value: selectedTokenIndex.toString() }, {
                children: [_jsx(TabList, Object.assign({ onChange: handleChange, "aria-label": "stake form tabs" }, {
                    children: supportedTokens.map((token, index) => {
                        return (_jsx(Tab, { label: token.name, value: index.toString() }, index));
                    })
                })), supportedTokens.map((token, index) => {
                    return (_jsx(TabPanel, Object.assign({ value: index.toString() }, { children: _jsxs("div", { children: [_jsx(WalletBalance, { token: supportedTokens[selectedTokenIndex] }), "2. big stake button"] }) }), index));
                })]
            }))
        })]
    }));
};
