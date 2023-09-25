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
})

router.post("/users/create", (req, res) => {
    const email = req.body.email 
    const password = req.body.password

    if(!email){
        res.redirect('/admin/users/create') 
    }
    if(!password){
        res.redirect('/admin/users/create') 
    }

    Admin.findOne({ where: { email: email}}).then( admin => {
        if(admin){
            res.redirect('/admin/users/create') 
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)


        Admin.create({
            email: email, 
            password : hash
        }).then(() =>{
            res.render('admin/users/listAdmin') 
        }).catch((err) => {
            res.redirect('/')
        })


    })
    
    



})

module.exports = router