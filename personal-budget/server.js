
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const myBudget = require('./models/budget_model')
const mongoose = require('mongoose')
let url = 'mongodb://127.0.0.1:27017/mongodb_demo';

app.use('/' , express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/budget', (req,res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to Database");
                myBudget.find().exec().then(data =>{
                res.json(data);
                console.log("Connection is closed");
            })
            .catch(err =>{
            console.log(err);
            })
        })
        .catch((connectionError) => {
            console.log(connectionError);
    })
});

    app.post('/personal-budget', (req, res) => {
        const { title, budget, color } = req.body;
        const newBudgetItem = new myBudget({
            title,
            budget,
            color,
        });
        newBudgetItem.save()
            .then(savedItem => {
                console.log('Budget item saved:', savedItem);
                res.status(201).json({"success": "true","data": savedItem}); 
            })
            
            });
    ;
    


app.listen(port, () => {
    console.log('Example app listening at https://localhost:${port}');
});