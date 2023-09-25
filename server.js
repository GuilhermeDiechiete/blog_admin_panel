const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const connection = require('./db/conn')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const adminController = require('./admin/AdminController')

const articleModel = require('./articles/ArticleModel')
const categoryModel = require('./categories/CategoryModel')
const adminModel = require('./admin/AdminModel')

connection.authenticate()
    .then(()=> console.log('Connect Database'))
    .catch((error) => {console.log(error)})

app.set('view engine', 'ejs')
app.use(session({
    secret: "g00d0001999", 
    cookie: {maxAge: 30000}
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', adminController)
app.use('/', categoriesController)
app.use('/', articlesController)

app.get('/', (req, res) => {

    articleModel.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        categoryModel.findAll().then(categories => {
           res.render('home', {articles: articles, categories: categories}) 
        })
        
    })
})
app.get('/:slug', (req, res) => {
    const slug = req.params.slug 
    articleModel.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(!article){
            res.redirect('/')
        }
        categoryModel.findAll().then(categories => {
            res.render('articles', {article: article, categories: categories}) 
         })
    }).catch( err => redirect('/'))
})
app.get('/category/:slug', (req, res) => {
    const slug = req.params.slug 
    categoryModel.findOne({
        where: {
            slug: slug
        },
        include: [{model: articleModel}]
    }).then( category => {
        if(!category){
            res.redirect('/')
        }
        categoryModel.findAll().then(categories => {
            res.render('home', {articles: category.articles, categories: categories})
        })
    }).catch( err => {
        res.redirect('/')
    })
})

app.listen(3333, ()=> console.log('Servidor executando...'))