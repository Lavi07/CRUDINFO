const mongoose = require('mongoose');

//Database connectivity
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, (err) => {
    if (!err) console.log("Successfully connected to DB");
    else console.log(`Error in connection to DB:- ${err}`);
})

module.exports = mongoose