/**
|--------------------------------------------------
| import moduals from packedges
|--------------------------------------------------
*/
let express = require('express');
let bodyParser=require("body-parser");
let dotenv = require('dotenv');
let app = express();
let jobs = require('./routes/jobs')

/**
|--------------------------------------------------
| use moduals
|--------------------------------------------------
*/

dotenv.config();


/**
|--------------------------------------------------
| use auth moduals
|--------------------------------------------------
*/

app.use(bodyParser.json());
app.use(express.json());


app.use('/',require('./routes/auth'));
app.use('/jobs',jobs);

app.get('*',(req,res)=>{
    res.send(`<h1>ROUTE DOES NOT EXIST</h1>`);
})

app.listen(process.env.PORT,()=>{
    console.log(`port runnig on http://localhost:${process.env.PORT}`);
})