const express = require('express'),
    router = express.Router(),
    User = require ('./User.js'),
    bcrypt = require('bcryptjs'),
    Category = require('../categories/Category.js')
    

router.get("/admin/users", (req, res) => {

    User.findAll().then(users => {
        res.render("admin/users/index.ejs",{
            users: users
        })
    })


})

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create.ejs")
})

router.post("/users/create", (req, res) => {
    let name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(password, salt)


    User.findOne(
        {where: {
            email: email    
        }}
    ).then(user => {
        if(user == undefined){
            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/admin/users/')
            }).catch((erro) => {
                console.log(erro)
                res.redirect('/')
            })
        }else{
            res.redirect("/admin/users/create")
        }
    })

})

router.get("/login", (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/users/login", {
            categories: categories
        })
    })

})

router.post("/authenticate", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user){
            let correct = bcrypt.compareSync(password, user.password)

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }

                res.redirect('admin/articles/')
            }else{
                res.redirect("/login")
            }
        }else{
            res.redirect("/login")
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = null
    
    res.redirect("/")
})


module.exports = router