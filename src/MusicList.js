import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Favorite, FavoriteBorder, PlayArrow } from '@material-ui/icons';
import SnackbarMsg from './snackmsg';

const styles = {
    card: {
        backgroundColor: "pink",
        minWidth: 120,
        maxWidth: 300,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
};

function MusicList (props) {

    const [likes, setLikes] = useState({});
    const [snackbar, setSnackbar] = useState({});

    const toggleFavorite = (id) => {
        console.log(likes[id]);
        if (likes[id] == undefined){
            likes[id] = true;
        } else{
            likes[id] = (likes[id]) ? false : true; 
        }
        console.log(likes);
        setSnackbar({open: true, msg: `${id} checked`});
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setSnackbar({open: false});
    }
    const classes = {props};

    return (
        <div className={props.classes}>
            
            {props.list.results.map(item => {
                return(
                    <Card key={item.collectionId} className={props.classes['card']}>
                        <CardMedia 
                            component="img"
                            height="100%"
                            image={item.artworkUrl100}
                            alt="Black Pink"
                        />
                        <CardContent>
                            <Typography variant="subtitle1"> {item.artistName}</Typography>
                            <Typography variant="subtitle2"> {item.collectionCensoredName}</Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton>
                            <PlayArrow sx={{height: 35, width: 38}}/>
                            </IconButton>
                            <Button size="small">Share</Button>
                            <Button size="small">More about Artist</Button>
                            <IconButton onClick={() => {toggleFavorite(item.collectionId)}}>
                            {likes[item.collectionId] ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </CardActions>
                    </Card>
                )
            })}
            <SnackbarMsg open={snackbar.open} message={snackbar.msg} onClose={handleSnackbarClose}></SnackbarMsg>
        </div>
    )
}

export default withStyles(styles)(MusicList);