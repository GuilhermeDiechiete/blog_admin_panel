const router = require('express').Router()


const Article = require('./ArticleModel')
const Category = require('../categories/CategoryModel')
const slugify = require('slugify')




router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render('admin/articles/list', { articles: articles})
    })
})

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {categories: categories})
    })
})
router.post('/admin/articles/save', (req, res) => {
    const title = req.body.title
    const body = req.body.body 
    const category = req.body.selectCategory

    Article.create({
        title: title, slug: slugify(title), body: body, categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })
})
// delete articles
router.post('/articles/delete', (req, res) => {
    const id = req.body.id 
    if(!id){
        res.redirect('/admin/articles')
    }
    Article.destroy({
        where: { id: id}
    }).then(()=> {
        res.redirect('/admin/articles')
    })
})
// view category for editing
router.get('/admin/articles/edit/:id', (req, res) => {
    const id = req.params.id 
    Article.findByPk(id).then(article => {
        if(!article){
            res.redirect('/admin/articles')
        }
        Category.findAll().then(categories => {
           res.render('admin/articles/edit', {article: article, categories: categories}) 
        })
        
    }).catch(err => {
        res.redirect('/')
    })
})
router.post('/admin/articles/update', (req, res) => {
    const id = req.body.id 
    const title = req.body.title 
    const body = req.body.body 
    const categoryId = req.body.selectCategory

    if(!title){
        alert('Você precisa adicionar um título')
    }
    Article.update({ 
        title: title, 
        slug: slugify(title), 
        body:body, 
        categoryId: categoryId }, 
        
        { where: {id:id}}).then(() => {
        res.redirect('/admin/articles')
    }).catch(err => {
        res.redirect('/')
    })
})

router.get('/articles/page/:num', (req, res) => {
    const page = req.params.num

    if(isNaN(page) || page == 1){
        offset = 0
    } else {
        offset = (parseInt(page) -1) * 4
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ],
    }).then(articles => {

        var next
        if(offset + 4 >= articles.count){
            next = false
        } else {
            next = true
        }
        const result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }
        Category.findAll().then(categories => {
            res.render('admin/articles/page', {result: result, categories: categories})
        })
        
    })
})

module.exports = router