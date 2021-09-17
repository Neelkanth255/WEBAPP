let mongoose = require('mongoose');

let execute = async () => {
  let start = await mongoose.connect(
    'mongodb+srv://neel123:neel123@cluster0.jvy4z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  );
  // console.log(start);

};

module.exports = execute;
