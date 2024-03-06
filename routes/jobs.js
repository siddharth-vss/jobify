let express = require('express');
let router = express.Router();
let {auth} = require('../middleware/auth');
let {createJob,getAllJob,deletJob,updateJob,showState} = require("../controller/jobcontroller");




router.route('/state').get(auth,showState);
router.route('/').get(auth,getAllJob).post(auth,createJob);
// router.route('/');
router.route('/:id').patch(auth,updateJob).delete(auth,deletJob);
// router.route('/:id');

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

module.exports = router;