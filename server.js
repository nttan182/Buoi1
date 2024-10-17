import path from 'path'
import express from 'express'
import dotenv from 'dotenv/config'
import viewEngine from './viewEngine'
import initWebRouters from './src/route'

const app = express()
viewEngine(app)
const port=process.env.PORT 
app.set("views",path.join(__dirname,"src","views"))
initWebRouters(app)

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})