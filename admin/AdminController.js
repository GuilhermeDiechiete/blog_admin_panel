const bcrypt = require('bcryptjs')

const router = require('express').Router()
const Admin = require('../admin/AdminModel')


// list users
router.get("/admin/users", (req, res) => {
    Admin.findAll().then(users => {
        res.render("admin/users/listAdmin", {users: users})
    })
})

// register user
router.get("/admin/users/create", (req, res) => {
    res.render('admin/users/create')
    console.log('acessou rota criar usuario')
})

router.post("/users/create", (req, res) => {
    const email = req.body.email 
    const password = req.body.password

    Admin.findOne({ where: { email: email}}).then( user => {
        if(user == undefined){

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            Admin.create({
                email: email, 
                password : hash
            }).then(() =>{
                res.redirect('/admin/articles') 
                console.log('criou usuario')
            }).catch(err => {
                res.redirect('/')
            }) 
        } else {
            res.redirect('/admin/users/create') 
        }
    })
})
router.get('/login', (req, res) => {
    res.render("admin/users/login")
})
router.post('/authenticate', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    Admin.findOne({where:{email:email}}).then(user => {
        if(user != undefined){
            const corrent = bcrypt.compareSync(password, user.password)

            if(corrent){
                req.session.user = {
                    id: user.id, 
                    email: user.email
                }
                res.redirect('/admin/articles')
            } else {
                res.redirect('/')
            }
        } else {
            res.redirect('/')
        }
    }) 
})
router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})


module.exports = router