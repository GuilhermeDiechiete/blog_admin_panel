// import
const router = require('express').Router() // Work with routes
const slugify = require('slugify') // Working with name in URLs

const CategoryModel = require('./CategoryModel') // bank entities
const adminAuth = require('../middlewares/adminAuth')
// new category
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})
// save category
router.post('/admin/categories/save', adminAuth,(req, res) => {
    const title = req.body.title 

    if(!title){ res.redirect('/admin/categories/new') }

    CategoryModel.create({
        title: title, 
        slug: slugify(title),
    }).then(()=>{ res.redirect('/admin/categories') })
})

// category list
router.get('/admin/categories', adminAuth,(req, res) => {
    CategoryModel.findAll().then(categories => {
        res.render('admin/categories/list', { categories: categories})
    })   
})
// delete category
router.post('/categories/delete', adminAuth,(req, res) => {
    const id = req.body.id 
    if(!id){
        res.redirect('/admin/categories')
    }
    CategoryModel.destroy({
        where: { id: id}
    }).then(()=> {
        res.redirect('/admin/categories')
    })
})
// view category for editing
router.get('/admin/categories/edit/:id', adminAuth,(req, res) => {
    const id = req.params.id 
    CategoryModel.findByPk(id).then(category => {
        if(!category){
            res.redirect('/admin/categories')
        }
        res.render('admin/categories/edit', { category: category})
    })
})
// edit category
router.post('/admin/categories/update', adminAuth,(req, res) => {
    const id = req.body.id 
    const title = req.body.title 

    if(!title){
        alert('Você precisa adicionar um título')
    }
    CategoryModel.update({ title: title, slug: slugify(title) }, { where: { id:id}}).then(() => {
        res.redirect('/admin/categories')
    })
})


module.exports = router