
const getAllJob = async(req,res) =>{
  res.send("getAllJob")
}
const deletJob = async(req,res) =>{
  res.send("deletJob")
}
const createJob = async(req,res) =>{
  res.send("createJob")
}
const updateJob = async(req,res) =>{
  res.send("updateJob")
}
const showState = async(req,res) =>{
  res.send("showState")
}



module.exports = {createJob,getAllJob,deletJob,updateJob,showState}