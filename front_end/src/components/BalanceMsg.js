import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    container: {
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        gap: theme.spacing(1),
        alignItems: "center"
    },
    tokenImg: {
        width: "32px"
    },
    amount: {
        fontWeight: 700
    }
}));
export const BalanceMsg = ({ label, amount, tokenImgSrc }) => {
    const classes = useStyles();
    return (_jsxs("div", Object.assign({ className: classes.container }, { children: [_jsx("div", { children: label }), _jsx("div", Object.assign({ className: classes.amount }, { children: amount })), _jsx("img", { className: classes.tokenImg, src: tokenImgSrc, alt: "token logo" })] })));
};
