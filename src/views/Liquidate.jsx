import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Web3Context } from '../context/Web3Provider';

const styles = (theme) => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
});

const DrawHistory = () => {
    const [formMessage, setFormMessage] = useState('');
    const [error, setError] = useState(false);

    const { currentAccount, messageContract } = useContext(Web3Context);

    const handleSet = async (e) => {
        e.preventDefault();

        if (!formMessage.trim()) {
            setError(true);
            return;
        }
        const gas = await messageContract.methods
            .setMessage(formMessage)
            .estimateGas();
        const result = await messageContract.methods
            .setMessage(formMessage)
            .send({ from: currentAccount, gas });
        console.log(result);

        e.target.reset();
        setError(false);
        setFormMessage('');
    };

    return (
        <div className='form-div'>
            <p>You are currently connected with the {currentAccount} account</p>
            <h2>Formulario para setMessage</h2>
            <form onSubmit={handleSet}>
                <input
                    type='text'
                    placeholder='Set Message'
                    className='form-control mb-2'
                    onChange={(e) => setFormMessage(e.target.value)}
                    value={formMessage}
                />
                {error ? <p>Agrega un mensaje!</p> : null}
                <button className='btn btn-primary btn-block' type='submit'>
                    Set Message
        </button>
            </form>
        </div>
    );

};

export default withStyles(styles)(DrawHistory);
