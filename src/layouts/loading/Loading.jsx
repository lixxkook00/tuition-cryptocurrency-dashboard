import React from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const Loading = () => {
    const globalState = useSelector(state => state.loading)

    return (
        <>
            {
                globalState
                &&
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ 
                        zIndex: 1000000000,
                        height: '100vh',
                        position: 'fixed',
                        top : '0',
                        left : '0',
                        backgroundColor: 'rgb(0 0 0 / 55%)'
                    }}
                >
                    <Grid item>
                        <CircularProgress color='success' />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" style={{ marginTop: 16, color: '#fff' }}>
                            Loading...
                        </Typography>
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default Loading;