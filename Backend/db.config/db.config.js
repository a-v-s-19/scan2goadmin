const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/Scan2GoAdmin'
const ConnectToAdminDataBase = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { console.log("Admin Database is connected successfully") })
        .catch((error) => { console.log({ Message: "Admin Database connection Error", Error: error }) })
}
module.exports = ConnectToAdminDataBase