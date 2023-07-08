const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000; 
const connectDB = require('./db');
const path = require('path');
const cors = require('cors');
connectDB()

app.use(cors())
app.use(express.json({extended:false}));
app.use(express.static('root'))

app.use('/api/folder/create',require('./api/create'))
app.use('/api/folder/read',require('./api/read'))
app.use('/api/folder/delete',require('./api/delete'))



if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'root')));
    // app.get('*',(req,res)=>{
    //     res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    // })
}
else{
    app.get('/',(req,res)=>{
        res.send('API running...')
    })
}

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode...`)
})
