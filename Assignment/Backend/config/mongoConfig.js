const mongoose = require('mongoose')

const connectdb = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/Users");
  
      console.log(`Mongo Connected  `);
    } catch (err) {
      console.log(`Error ${err.message} `);
      process.exit(1);
    }
  };
module.exports = connectdb 