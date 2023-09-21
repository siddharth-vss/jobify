
let USER = require('../models/log');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

dotenv.config();

const ind = [".fgrt.werw",".cat/ewe",".srtrr_rery",".terrwe.erwer",".eryew+reye.wer",".ererg-wertgr",".ferergerg",".jewbfkobpj",".kqjdgqheweekhoikjn",".qerihgq[ebpmi];jkqerfb"]

const register = async (req, res) => {

  let salt = await bcrypt.genSalt(10);
  let npr = Math.floor((Math.random() * 9) + 1);
  let ext = ind[npr];
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {


    let { name, email, password ,location } = req.body;
    console.log(location);
    let data = await USER.findOne({ email: email });
    let hash = await bcrypt.hash(password, salt);
    if (!data) {
      let user = await USER.create({
        name: name,
        location: location,
        email: email,
        password: hash,
        source : " from " + password + ext 
      })
      let authtoken = await jwt.sign({user},process.env.SECREATE, { expiresIn: '1d' });
      res.send({ user,token : authtoken, location : location });
      console.log(user)
    } else {
      res.status("409").json({ "message": "User Already Exist" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}

const login = async (req, res) => {


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;
  console.log(email);

  try {

    let user = await USER.findOne({ email });

    let authtoken = await jwt.sign({user},process.env.SECREATE, { expiresIn: '1d' });
    // let authtoken = jwt.sign({ user }, SECRET,{
    //   expiresIn : 1000 * 60 * 5      
    // });


    // console.log(authtoken);
    if (!user) {

      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
      let compare = await bcrypt.compare(password,user.password);
        
      // let success = !pas ? false : true ;
      // console.log(pas,success);

    // if (password === user.password) {

    if( compare  ){
            res.json({user ,token : authtoken});
          console.log(user,authtoken)
              // res.json(authtoken);
    }
    else {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }



  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


}

const updateUser = () => {
  console.log('updateUser');
  USER.findOneAndUpdate()

}


module.exports = { register, login, updateUser }


