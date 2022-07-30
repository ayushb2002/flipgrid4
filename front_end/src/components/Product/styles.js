import { makeStyles } from "@material-ui/styles";

export default makeStyles(() =>({
    root: {
        maxWidth: '90%'
    },
    media: {
        height: '0',
        paddingTop: '56.25%',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardDesc: {
        display: 'flex',
        width:'100%',
        fontSize:15
    },
}));