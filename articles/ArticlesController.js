const router = require('express').Router()

router.get('/articles', (req, res) => {
    res.send('Artigos')
})

router.get('/admin/articles/new', (req, res) => {
    res.send('Criar novo artigo')
})


module.exports = router