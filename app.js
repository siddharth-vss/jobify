/**
|--------------------------------------------------
| import moduals from packedges
|--------------------------------------------------
*/
let express = require('express');
let bodyParser=require("body-parser");

let path =require('path');

let dotenv = require('dotenv');
let app = express();
let jobs = require('./routes/jobs');
let user = require('./routes/auth');
let cors = require('cors');

/**
|--------------------------------------------------
| use moduals
|--------------------------------------------------
*/

dotenv.config();
/**
|--------------------------------------------------
|  only when ready to deploy                                                
|--------------------------------------------------
*/
app.use(express.static(path.resolve(__dirname,"./public")) )

/**
|--------------------------------------------------
| use auth moduals
|--------------------------------------------------
*/

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({credentials:true}));


app.use('/',user);
app.use('/jobs',jobs);


app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname,'./client/build','index.html'));
    
  });
app.listen(process.env.PORT,()=>{
    console.log(`port runnig on http://localhost:${process.env.PORT}`);
}) 