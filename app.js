
const express = require('express')
const app = express();
const mongoose = require('mongoose')

require('dotenv').config()

const userRoute = require('../api/routes/user')
const videoRoute = require('../api/routes/video')
const commentRoute = require('../api/routes/comments')

const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

// mongoose.connect(process.env.MONGO_URL)
// .then(res=>{
//     console.log('conneted with database..')
// })
// .catch(err=>{
//     console.log(err)
// })

// connecting with database
const connectWithDatabase = async()=>{
    try
    {
        const res = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected with database..')
    }
    catch(err)
    {
        console.log(err)
    }
}
connectWithDatabase();

app.use(bodyParser.json())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp/'
}));

app.use('/user',userRoute)
app.use('/video',videoRoute)
app.use('/comments',commentRoute)


module.exports = app;