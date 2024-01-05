require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('models/book.js');
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.set('strictQuery',false);
const connectDB = async (req, res) => {
try {
const conn = await mongoose.connect(process.env.MONGO_URI);
console.log(`MongoDB Connected: ${conn.connection.host}`);
}
catch (err) {
    console.log(err);
    process.exit(1)
    }
}

app.get('/', (req, res) => {
res.send({title:'Books'})
})


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on ${PORT}`);
    })
})

app.get('/add-note',async(req,res)=>{
    try{
        await Book.insertMany([
            {
                title: 'Sons of Anarchy',
                body:'Body text here.....'
            },
            {
                title: 'Games of Thrones',
                body: "Body text here....."
            }
        ])
    }
    catch(err){
    console.log(err)
    }
})

app.get('/books',async(req,res)=>{
    const book = await Book.find()
    if(book){
        res.json(book)
    }
    else{
        res.send("something went wrong")
    }
})