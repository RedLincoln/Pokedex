const express = require('express')
const mustache = require('mustache-express')

const port = 8081
const VIEWS_PATH = __dirname + '/views'
const app =  express()

app.use(express.static('public'))

const indexRouter = require('./routes/index')

app.use('/pokemon', indexRouter)


app.engine('mst', mustache(VIEWS_PATH + '/partials', '.mst'))
 
app.set('view engine', 'mst')
app.set('views', VIEWS_PATH)


app.listen(port, ()=> {
    console.log(`Server Listening in port ${port}`)
})