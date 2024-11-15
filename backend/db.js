const mongoose = require('mongoose')

function database(){
    mongoose.connect('mongodb://localhost:27017/Shopping_banner', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
      });


}

database();
module.exports = database;
