const router = require('express').Router()


const Article = require('./ArticleModel')
const slugify = require('slugify')

const Category = require('../categories/CategoryModel')

router.get('/admin/articles', (req, res) => {
    res.render('admin/articles/list')
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})
    })
})
router.post('/admin/articles/save', (req, res) => {
    const title = req.body.title
    const body = req.body.body 
    const category = req.body.category

    Article.create({
        title: title, slug: slugify(title), body: body, categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

module.exports = router