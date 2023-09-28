




let Job = require('../models/job');
 

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  req.body.createdBy = req.user._id;

  const job = await Job.create(req.body);
  res.status(400).json({ job });
};
const getAllJob = async(req,res) =>{
  res.send("getAllJob")
}
const deletJob = async(req,res) =>{
  res.send("deletJob")
}

const updateJob = async(req,res) =>{
  res.send("updateJob")
}
const showState = async(req,res) =>{
  res.send("showState")
}



module.exports = {createJob,getAllJob,deletJob,updateJob,showState}