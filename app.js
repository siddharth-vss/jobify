let express = require('express');
let bodyParser=require("body-parser");
let app = express();
let USERS = require('./models/log')
app.use(bodyParser.json());


 
app.get('/',async(req,res)=>{
    let user = await USERS.find({});
    res.json({user})
})

app.post('/',async(req,res)=>{
    let user = await USERS.find({});
    let data = await USERS.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    console.log(data);

    res.json({user});
})

app.listen(process.env.PORT,()=>{
    console.log(`port runnig on http://localhost:${process.env.PORT}`);
})