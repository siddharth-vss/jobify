let express = require('express');
let router = express.Router();
let {createJob,getAllJob,deletJob,updateJob,showState} = require("../controller/jobcontroller");




router.route('/state').get(showState);
router.route('/').get(getAllJob);
router.route('/').post(createJob);
router.route('/:id').patch(updateJob);
router.route('/:id').delete(deletJob);

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