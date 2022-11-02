import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    root: {
        position: 'relative',
        maxWidth: '100%',
        height: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', //16:9
    },
    cardActionCont: {
        position: 'relative',
        display: 'block',
        height: '50px',
        bottom:'0'
    },
    cardActionsLeft: {
        position: 'absolute',
        left: '8px',
        bottom: '0',
        width: '200px'
    },
    cardActionsRight: {
        position: 'absolute',
        right: '0',
        bottom: '0',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },  
}));