import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: '100%',
  },
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
    marginLeft:'auto',
    marginRight: 'auto',
  },
  buttons: {
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
  },
}));