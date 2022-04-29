import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Favorite, FavoriteBorder, PlayArrow } from '@material-ui/icons';
import SnackbarMsg from './snackmsg';

const styles = theme => ({
    content: {},
    layout: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: "pink",
        minWidth: 120,
        maxWidth: 300,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

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
        setLikes({open: true, msg: `Thanks for response`});
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway"){
            return;
        }
        setSnackbar({open: false, msg: 'Unlike'});
    }
    const {classes} = {props};

    return (
        <div className={classes}>
            {props.list.results.map(item => {
                return(
                    <Card key={item.collectionId} variant="outlined">
                        <CardMedia 
                            component="img"
                            height="50%"
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
                            {/* <IconButton onClick={toggleFavorite(item.collectionId)}>
                            {this.state.likes[item.collectionId] ? <Favorite /> : <FavoriteBorder />}
                            </IconButton> */}
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )
}

export default withStyles(styles)(MusicList);