const path=require('path');

const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
require('dotenv').config();

const app=express();

const shortenerRoutes=require('./routes/shortener');

const errorController=require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(shortenerRoutes);

app.use(errorController.get500);

app.use(errorController.get404)

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
.then((result)=>{
    app.listen(process.env.PORT||8000); 
})
.catch((error)=>{
    console.log(error);
});