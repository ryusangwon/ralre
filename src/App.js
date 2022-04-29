import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import MusicList from './MusicList';
import music_list from './server/data';

function App() {

    return (
        <div>
            <AppBar position="fixed">
                <Typography align="center" variant="h3" color="inherit">
                    Find Musics
                </Typography>
            </AppBar>
            <div style={{height: 60, width: '100%'}}></div>
            <MusicList list={music_list}></MusicList>
        </div>
    );
}

export default App;
