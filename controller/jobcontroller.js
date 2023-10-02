let bodyparser = require('body-parser');

let Job = require('../models/job');


const createJob = async (req, res) => {
  const { position, company } = req.body;
//console.log("Create Job SERVER ",req.body,req.user);
  if (!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  req.body.createdBy = req.user;
  console.log()
  const job = await Job.create(req.body);
  res.status(200).json({ job });
};
const getAllJob = async(req,res) =>{
  const jobs = await Job.find({ createdBy:(req.user)  });

  res
    .status(200)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
}
const deletJob = async(req,res) =>{
   const { id: jobId } = req.params;
  
    const job = await Job.findOne({ _id: jobId });
  
    if (!job) {
      res.status(400).send(`No job with id : ${jobId}`);
    }
  
    if (req.user === job.createdBy.toString()) {
      const deletJob = await Job.findByIdAndDelete({ _id: jobId });
    
      // console.log(job,updatedJob);
      
    res.status(200).json({ msg: 'Success! Job removed' });
    }
    else{ res.status(400).send('Not authorized to access this route');}
    
     
  } 


const updateJob = async(req,res) =>{
  const { id: jobId } = req.params;
// console.log(req.params);
  const { company, position, jobLocation  } = req.body;


  if (!company || !position) {
    throw new BadRequestError('Please Provide All Values');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  // console.log(req.user, job.createdBy.toString());
  if (req.user === job.createdBy.toString()) {
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
      
    });
  
    // console.log(job,updatedJob);
    res.status(200).json( updatedJob );
  }
  else{ res.status(400).send('Not authorized to access this route');}
  
   
  
  // res.send("updateJob")
}
const showState = async(req,res) =>{
  res.send("showState")
}



module.exports = {createJob,getAllJob,deletJob,updateJob,showState}

/*


  // check permissions

  // alternative approach


};*/