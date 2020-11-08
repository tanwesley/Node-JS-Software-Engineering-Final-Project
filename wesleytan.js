const express = require('express')
const expressHandlebars = require ('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()

//configure Handlebars view engine
app.engine('handlebars', expressHandlebars ({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

// syllabus
app.get('/syllabus', (req, res) => {
    res.render('syllabus')
})

app.use(express.static(__dirname + '/public'))

// diceroll
app.get('/diceroll', (req, res) => {
    res.render('diceroll')
})

// meadowlark
app.get('/meadowlark', (req, res) => {
    res.render('meadowlark')
})

// custom 404 page
app.use((req,res) => {
    res.status(404)
    res.render('404')
})

//custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    'Express started on http://losthost:${port};' +
    'press Ctrl-C to terminate.'))