import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectdb from './src/DB/db.js'
import app from './src/app.js'

const port = 3000;

connectdb()

app.listen(port,()=>{
     console.log(`Example app listening on port ${port}`);
})


