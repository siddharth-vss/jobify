let bodyparser = require('body-parser');
let mongoose = require('mongoose')
let Job = require('../models/job');
let moment = require('moment');

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
const getAllJob = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user,
  };

  if (status !== 'all') {
    queryObject.status = status;
  }
  if (jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // NO AWAIT
  let result = Job.find(queryObject);

  // chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(200)
    .json({ jobs, totalJobs, numOfPages });
};
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
const showState = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  console.log(stats);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  console.log(stats);
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
  { $match: { createdBy:  new mongoose.Types.ObjectId(req.user) } },
  {
    $group: {
      _id: {
        year: {
          $year: '$createdAt',
        },
        month: {
          $month: '$createdAt',
        },
      },
      count: { $sum: 1 },
    },
  },
  { $sort: { '_id.year': -1, '_id.month': -1 } },
  { $limit: 6 },
]);
monthlyApplications = monthlyApplications
  .map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    // accepts 0-11
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM Y');
    return { date, count };
  })
  .reverse();
  res.status(200).json({ defaultStats, monthlyApplications });
};



module.exports = {createJob,getAllJob,deletJob,updateJob,showState}

/*


  // check permissions

  // alternative approach


};*/