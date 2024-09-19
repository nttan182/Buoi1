import express from 'express'
import dotenv from 'dotenv/config'
import myDateTime from './date'
import {getParamsURL,getPath} from './getURL'
import viewEngine from './viewEngine'
const app = express()
viewEngine(app)
const port=process.env.PORT 

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})

app.get('/date', (req, res) =>{
    res.send(myDateTime())
})

app.get('/geturl', (req, res) =>{
    res.send(getPath(req) + getParamsURL(req))
})

app.get('/ejs', (req, res) =>{
    res.render('test')
})

app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/about', (req, res) =>{
    res.render('about')
})