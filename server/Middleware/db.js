const mongoose = require('mongoose');
const username = "Aditi";
const password = 'GuptaAditi_2112';
const url = `mongodb+srv://${username}:${password}@cluster0.zrf1zde.mongodb.net/DonorUser?retryWrites=true&w=majority&appName=Cluster0`
const connectDb = async () => {
    try{
        const data = await mongoose.connect(url)
        console.log('DB Connected');
    } catch (err){
        console.log(err);
    }
}

module.exports = connectDb;