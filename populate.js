

const { readFile } = require('fs/promises');
const mongoose  = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const JOB = require('./models/job')
const USER = require('./models/log')

const start = async()=>{
try {
    await mongoose.connect(process.env.DB);
    const user = await USER.findOne({email : "testuser@gmail.com"})

    const jsonProducts = JSON.parse(
        await readFile('./MOCK_DATA.json',{ encoding: 'utf8' })
      );

      const jobs = jsonProducts.map((job)=>{
        return{...job, createdBy:user._id}
      })
      await JOB.deleteMany({createdBy:user._id});
      await JOB.create(jobs);
      console.log('Success!!!!');
      process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}

}
start();