import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import { dbconnection } from './database/dbconnection.js'
import { bootstrap } from './src/bootstrap.js'
import cors from "cors"
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static("uploads"))

dbconnection();
bootstrap(app);




app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))