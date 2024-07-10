const mongoose = require('mongoose')

const connectDb = async () => {
  try{
    const con = await mongoose.connect(`mongodb://localhost:27017/exam`);
    console.log(`Connected to Mongodb ${con.connection.host}`);
  } catch(err){
    console.log(`Error in Mongodb: ${err}`);
  } 
}

module.exports = {
    connectDb
}