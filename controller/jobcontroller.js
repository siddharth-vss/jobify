let bodyparser = require('body-parser');

let Job = require('../models/job');
 

const createJob = async (req, res) => {
  const { position, company } = req.body;
console.log(req.body,req.user);
  if (!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  req.body.createdBy = req.user;

  const job = await Job.create(req.body);
  res.status(400).json({ job });
};
const getAllJob = async(req,res) =>{
  const jobs = await Job.find({ createdBy:(req.user)  });

  res
    .status(200)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
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