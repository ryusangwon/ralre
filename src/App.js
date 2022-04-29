import React from 'react';
import { Typography, AppBar } from '@material-ui/core';

function App() {
    return (
        <div>
            <AppBar position="fixed">
                <Typography align="center" variant="h3" color="inherit">
                    Find Musics
                </Typography>
            </AppBar>
            <div style={{height: 60, width: '100%'}}></div>

        </div>
    );
}

export default App;
