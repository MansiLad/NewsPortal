const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const News = require('./models/news')
const Papers = require('./models/paper')
const articlesRouter = require('./routes/articles')
const newsRouter = require('./routes/news')
const papersRouter = require('./routes/papers')
const methodOverride = require('method-override')
const path = require("path")
const app = express()

mongoose.connect('mongodb://localhost/news_portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Monoose'))

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use(express.static('static'))

app.get('/', async(req, res) => {
    res.render('index')
})

app.get('/articles', async(req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/articles', { articles: articles})
})
app.use('/articles', articlesRouter)

app.get('/news', async(req, res) => {
    const news = await News.find().sort({
        createdAt: 'desc'
    })
    res.render('news/technews', { news: news})
})
app.use('/news', newsRouter)

app.get('/papers', async(req, res) => {
    const papers = await Papers.find().sort({
        createdAt: 'desc'
    })
    res.render('papers/papers', { papers: papers})
})
app.use('/papers', papersRouter)


app.listen(8000)