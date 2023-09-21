const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./db/conn')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

const articleModel = require('./articles/ArticleModel')
const categoryModel = require('./categories/CategoryModel')

connection.authenticate()
    .then(()=> console.log('Connect Database'))
    .catch((error) => {console.log(error)})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', categoriesController)
app.use('/', articlesController)

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3333, ()=> console.log('Servidor executando...'))