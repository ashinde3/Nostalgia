import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: '#ffb3b3',
        fontWeight: 500,
      },
      image: {
        marginLeft: '15px',
        borderRadius: 15,
      },
      [theme.breakpoints.down('sm')]: {
        mainContainer: {
          flexDirection: 'column-reverse',
        },
      }
      
}));