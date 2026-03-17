
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const userRoute = require('./routes/user')
const videoRoute = require('./routes/video')
const commentRoute = require('./routes/comments')

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

app.use(cors())
app.use('/user',userRoute)
app.use('/video',videoRoute)
app.use('/comments',commentRoute)


module.exports = app;