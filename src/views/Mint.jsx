import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Web3 from 'web3';
import { withStyles } from '@material-ui/core/styles';
import { Web3Context } from '../context/Web3Provider';
import { Grid, TableHead } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import CasinoIcon from '@material-ui/icons/Casino';

const styles = (theme) => ({
    paper: {
        backgroundColor: '#ffffff',
        border: '2px solid #000',
        boxShadow: '$000000',
        padding: 20,
    },
    paperModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    tableBorder: { borderWidth: 1, border: '1px solid rgba(224, 224, 224, 1)' },
    circularProgress: {
        marginLeft: 0,
        marginRight: theme.spacing(1),
    },
});



const Mint = (props) => {
    // const [formMessage, setFormMessage] = useState('');
    const [error, setError] = useState(false);
    const [owner, setOwner] = useState('Loading...');
    const [lastTx, setLastTx] = useState('');
    const [number, setNumber] = useState('_ _ _ _ _ _');
    const [drawEvent, setDrawEvent] = useState({});
    const { currentAccount, lotteryContract, syntheticContract, dollyContract, tokenContract, web3, alert } = useContext(Web3Context);

    const { classes } = props;

    useEffect(() => {
        async function fetchData() {
            try {
                if (lotteryContract.methods) {
                    const index = await syntheticContract.methods
                        .owner()
                        .call();
                    setOwner(index);
                }
                if (lotteryContract.events) {
                    // console.log('web3Instance', web3Instance);
                    const lastestBlock = await web3.eth.getBlockNumber();
                    console.log('lastestBlock', lastestBlock);
                    lotteryContract.events.Drawed({
                        fromBlock: lastestBlock
                    })
                        .on('connected', function (subscriptionId) {
                            // console.log('subscriptionId', subscriptionId);
                            // setSubscriptionId(subscriptionId);
                        })
                        .on('data', function (event) {
                            console.log(event); // same results as the optional callback above
                            setDrawEvent(event);
                        });
                }
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
        return () => {
            // console.log('componentWillUnmount');
            // web3.eth.clearSubscriptions();
        };
    }, [lastTx, currentAccount, drawEvent]);

    useEffect(() => {
        // console.log('number', number);
    }, [number]);

    const getFirstPrize = () => {
        return new Promise(async (resolve, reject) => {
            try {
                // const promises = [];
                // for (let i = 0; i < 6; i++) {
                //     promises.push(lotteryContract.methods
                //         .winningNumbers(0, 0, i)
                //         .call());
                // }
                // const result = (await Promise.all(promises)).join('');
                // setFirstPrize(result);
            } catch (err) {
                reject(err);
            }
        });
    };
    return (
        <div>
            <AppBar
                className={classes.searchBar}
                position='static'
                color='default'
                elevation={0}
            >
                <Toolbar>
                    <Grid container item justify='flex-start' xs={3}>
                        <Grid>
                            <h3>Mint synthetic asset</h3>
                        </Grid>
                    </Grid>
                    <Grid container item justify='flex-end' xs={9}>

                    </Grid>
                </Toolbar>
            </AppBar>
            {error ? <p>Message</p> : null}
            <h3>{owner}</h3>
            <Grid container style={{ padding: 20 }}>


            </Grid >
        </div >
    );

};

export default withStyles(styles)(Mint);
