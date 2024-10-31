import path from 'path'
import express from 'express'
import dotenv from 'dotenv/config'
import viewEngine from './viewEngine'
import initWebRouters from './src/route'
import bodyParser from 'body-parser'
import session from 'express-session'

const app = express()
app.use(
    session({
      secret: "hehe ahhe hahehheehehhe",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
  
viewEngine(app)
const port=process.env.PORT 
app.set("views",path.join(__dirname,"src","views"))
app.use(bodyParser.urlencoded({extended:true}))
initWebRouters(app)
app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})
