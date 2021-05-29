import React, { useContext } from 'react';
import { Web3Context } from './context/Web3Provider';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';  //exporting context object
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Mint from './views/Mint';
import Redeem from './views/Redeem';
import Liquidate from './views/Liquidate';
import BuyDolly from './views/BuyDolly';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

const connectWallet = async () => {
  console.log('click');
};

const style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
  // position: "fixed",
  marginTop: 40,
  left: "0",
  bottom: "0",
  width: "100%",
};


const Content = (props) => {
  const { classes } = props;
  const { currentAccount } = useContext(Web3Context);

  return (
    <React.Fragment>
      <BrowserRouter>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="flex-start"
            >
              <Grid item md={3}>
                <Grid container>
                  <Grid item>
                    <Avatar alt="Logo" variant="rounded" style={{ width: '100%' }} src={window.location.origin + '/logo.svg'} />
                  </Grid>
                  <Grid item>
                    <Typography color="inherit" style={{ fontSize: 25, marginLeft: 20, alignItems: 'center' }}>Dopple Synthetic</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={7}
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                space={1}
              >
                <Grid item md>
                  <NavLink exact to="/" className="MuiButtonBase-root" style={{ opacity: 0.7 }} activeClassName="Mui-selected">
                    Mint
                </NavLink>
                </Grid>
                <Grid item md>
                  <NavLink to="/redeem" className="MuiButtonBase-root" style={{ opacity: 0.7 }} activeClassName="Mui-selected">
                    Redeem
                </NavLink>
                </Grid>
                <Grid item md>
                  <NavLink to="/liquidate" className="MuiButtonBase-root" style={{ opacity: 0.7 }} activeClassName="Mui-selected">
                    Liquidate
                </NavLink>
                </Grid>
                <Grid item md>
                  <NavLink to="/buyDolly" className="MuiButtonBase-root" style={{ opacity: 0.7 }} activeClassName="Mui-selected">
                    Get $DOLLY
                </NavLink>
                </Grid>
              </Grid>
              <Grid item md={2}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <Button variant="contained"
                    style={{
                      backgroundColor: '#ff5722',
                      color: '#ffffff'
                    }}
                    onClick={connectWallet}
                  >
                    {currentAccount.substr(0, 6) + '...' + currentAccount.substr(-6)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Route exact path="/">
          <Mint />
        </Route>
        <Route path="/redeem">
          <Redeem />
        </Route>
        <Route path="/liquidate">
          <Liquidate />
        </Route>
        <Route path="/buyDolly">
          <BuyDolly />
        </Route>
      </BrowserRouter>
      <div style={style}>
        Dopple Finance
        </div>
    </React.Fragment >
  );
};

export default withStyles(styles)(Content);
