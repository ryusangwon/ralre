const express = require('express');
const logger = require('morgan');
const list = require('./data');
const axios = require('axios');
const firebase = require('./firebase');
const app = express();  //server
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/musicSearch/:term', async (req, res) => {
    const params = {
        term: req.params.term,
        entity: "album",
    }
    var response = await axios.get("https://itunes.apple.com/search", {params: params});
    console.log(response.data);
    res.json(response.data);
})

app.get('/likes', async (req, res) => {
    var db = firebase.firestore();
    const snapshot = await db.collection('likes').get().catch(e => console.log(e));
    var results = [];
    if (snapshot.empty){
        console.log("No result");
        res.json([]);
        return;
    } else{
        snapshot.forEach(doc => {
            results.push({id: doc.id, like: doc.data().like});
            console.log(doc.id, '=>', doc.data());
        })
        res.json(results);
    }
})

let message = {msg: "Failed"};
try{
    console.log("check1");
    app.get('/likes/:id', async (req, res) => {

        var db = firebase.firestore();
        const snapshot = await db.collection('likes').get().catch(e => console.log(e));
        let results = [];
        snapshot.forEach(doc => {
            results.push({id: doc.id, like: doc.data().like});
        })
    
        if ((await db.collection('likes').doc(req.params.id).get()).exists){
            await db.collection('likes').doc(req.params.id).delete();
            for (let i=0; i<results.length; i++){
                if (results[i].id==req.params.id){
                    results.splice(i, 1);
                    i--;
                }
            }
            console.log("check2");
            // res.json(results);
            message.msg = "OK";
            res.json(message);
    
        } else{
            await db.collection('likes').doc(req.params.id).set({like: true});
            results.push({id: req.params.id, like: true});
            // res.json(results);
            message.msg = "OK";
            console.log("check3");
            res.json(message);
        }
        return;
    })
} catch(e){
    console.log("check4");
    console.log(e);
    res.json(message);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

app.get("/*", (req, res) => {
	console.log(__dirname);
	res.sendFile("index.html", { root: __dirname + "/public" });
});
