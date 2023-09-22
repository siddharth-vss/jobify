let express = require('express');
let router = express.Router();
// let dotenv =  require('dotenv');
let USER = require('../models/log');
const { body, validationResult } = require('express-validator');
let {register,login,updateUser} = require("../controller/authcontroller");
// dotenv.config();

router.route('/').get((req,res)=>{res.send(`<marquee><h1>WELCOME TO JOBIFY</h1></marquee>`);})
// router.route('/').get((req,res)=>{res.send(`${process.env.SECREATE}`);})
/**
|--------------------------------------------------|
|we can write routes with following two styles :   |
|                                                  |
|                                                  |
|    ** MODERN WAY **                              |
|                                                  | 
|  1.  router.route('/').post(register);           |
|                                                  |
|    ** TRADITIONAL WAY **                         |
|                                                  |
|  2.  router.post('/',register);                  |
|                                                  |
|--------------------------------------------------|
*/

router.route('/').post([
body('name','Enter a valid name').isLength({min : 3}),
body('email', 'Enter a valid email').isEmail(),
body('location', 'Enter a valid location').isLength({min : 3}),
body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),

],register);
router.route('/login').post([

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
     
    ],login);


module.exports = router;