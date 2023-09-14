let express = require('express');
// let bodyParser=require("body-parser");
let app = express();
// app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("hello");
})


app.listen(5000,()=>{
    console.log(`port runnig on http://localhost:5000`);
})