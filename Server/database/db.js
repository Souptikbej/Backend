const mongoose = require('mongoose');


const Connection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if (connect) {
            console.log("DB Connected");
        } else {
            console.log("Not Connected");
        }
    } catch (error) {
        console.log("Error while Connecting Database", error);
        process.exit(1);
    }
}


module.exports = Connection