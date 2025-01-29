const express = require('express');
const dotenv = require('dotenv').config();
const port = 5000;

const app = express();

//middleware (permet de traiter les données de la request)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//points d entré des routes


//lancer le serve
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
