import express from 'express';
import config from './config/config.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import Student from './router/Student.js'
import Fine from './router/Fine.js'
import Staff from './router/Staff.js'
import Hod from './router/hod.js'


dotenv.config()
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

config()

app.use('/api',Student)
app.use('/api',Fine)
app.use('/api',Staff)
app.use('/api',Hod)
app.get('/',(req,res)=>{
    res.send("<h1>Working</h1>")
})


const port=process.env.PORT || 5000
app.listen(process.env.PORT || 5000,() =>{
    console.log(`server is running in port ${port}`);
})