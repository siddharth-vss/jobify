let express = require('express');
let router = express.Router();

let {auth} = require("../middleware/auth");
let  {log,reg} = require("../middleware/midauth");
let {register,login,updateUser} = require("../controller/authcontroller");



router.route('/').get((req,res)=>{res.send(`<marquee><h1>WELCOME TO JOBIFY SERVER</h1></marquee>`);
})
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

router.route('/').post(reg,register);
router.route('/login').post(log,login);
router.route('/update').patch(auth,updateUser);
  

module.exports = router;