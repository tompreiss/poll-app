const express = require('express');
// const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors');
const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";
let db;
let collection = 'polls';


// connect to mongodb
MongoClient.connect(uri, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: 60,
    reconnectInterval: 1000
 }, (err, client) => {
  if (err) return console.error(err);
  db = client.db('opinionpoll');
  console.log('mongo connected');
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


/* Change URL to Heroku URL*/
app.use(express.json());
app.use(cors({ origin:'https://poll-build.herokuapp.com/', credentials:true }));

  
app.post('/api/poll/', (req, res) => {
        
    db.collection(collection).insertOne(req.body, (err, result) => {
        if (err) return console.error(err);
        res.json(result);
    
    });
    
       
});

app.get('/api/poll/:id', (req, res) => {
    db.collection(collection).findOne({_id:ObjectId(req.params.id)}, 
    (err, result) => {
        if (err) return console.error(err);
        res.json(result);
    
    });
});

app.put('/api/poll/:id', (req, res) => {
   // res.json(req.body);
   db.collection(collection).update({_id:ObjectId(req.params.id)}, 
   {$inc: {[`answers.${req.body.answer}.count`]: 1}},
    (err, result) => {
        if (err) return console.error(err);
        res.json(result);
    
    });
});

app.get('/results/:id', (req, res) => {
    db.collection(collection).findOne({_id:ObjectId(req.params.id)}, 
     
    (err, result) => {
        if (err) return console.error(err);
        res.json(result);
    
    });
});

app.get('/polls/', (req, res) => {
    db.collection(collection).find({},{projection:{question:1}} )
      
    .toArray(
     
    (err, result) => {
        if (err) return console.error(err);
        res.json(result);
    
    });
});

/* find({},{projection:{question:1}} ) */
/* .project({question:1}) ---not working with findOne() */ 


app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });







