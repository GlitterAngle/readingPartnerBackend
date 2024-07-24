import './config/database.js'
import 'dotenv/config.js'

import express from 'express'
import cors from 'cors'

//import routes when they are created

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

//once routes built put them here for the app

app.listen(PORT, function(){
    console.log(`App running on ${PORT} port`)
})