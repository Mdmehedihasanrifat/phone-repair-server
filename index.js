require('dotenv').config();
const express = require('express')
const cors=require('cors');
const bodyparser=require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 5000
const objectId=require('mongodb').ObjectID;

app.use(cors());
app.use(bodyparser.json());

const uri = `mongodb+srv://dbuser:${process.env.DB_PASS}@cluster0.aaumw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("shop").collection("products");

console.log("database ok");


app.post('/addProduct',(req,res)=>
{

    const product =req.body;
    collection.insertOne(product)
        .then(res=>{

            console.log("success")
        })

})
    app.get('/products',(req,res)=>{
             collection.find({})
                 .toArray((err,documents)=>{
               res.send(documents)
                     console.log(documents)
        })
    })

    app.delete('/delete/:id',(req ,res)=>{
        collection.deleteOne({_id: objectId(req.params.id)})

            .then(res=>{

                console.log(res)
            })
    })

});
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT||port);
