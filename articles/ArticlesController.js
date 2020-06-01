const express = require('express'),
    router = express.Router(),
    Category = require('../categories/Category.js'),
    Article = require('./Article.js'),
    slugify = require('slugify'),
    adminAuth = require('../middlewares/adminAuth.js')


router.get("/admin/articles/", adminAuth ,(req, res) => {

    Article.findAll({
        include: [{model: Category}],
        order: [['id', 'DESC']]
    }).then(articles => {
        res.render("admin/articles/index", {
            articles: articles
        })
    })

})

router.get("/admin/articles/new" , adminAuth ,(req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/articles/new", {
            categories: categories
        })
    })

})

router.post("/articles/save", (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let category = req.body.categories

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles/")
    })

})

router.post("/articles/delete", (req, res) => {
    let id = req.body.id

    if(id != undefined && isNaN(id) != true){
        Article.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/articles")
        })
    }else{
        res.redirect("/admin/articles")
    }
})

router.get("/admin/articles/edit/:id", adminAuth ,(req, res) => {
    let id = req.params.id

    if(isNaN(id)) res.redirect("/admin/articles/")
    
    Article.findByPk(id).then(articles => {
        if(id != undefined){
            res.render("admin/articles/edit", {
                articles: articles
            })
        }else{
            res.redirect("/admin/articles/")
        }
    })
    
})

router.post("/articles/update", (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let body = req.body.body

    Article.update({title: title, body: body, slug: slugify(title)},{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/admin/articles/")
    })
})

router.get("/articles/page/:num",(req, res) => {
    let num = parseInt(req.params.num)
    let offset = (parseInt(num) - 1) * 4

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        let next = offset + 5 > articles.count ? 0 : 1
        
        let last = offset - 4 >= 0 ? 1 : 0

        let result = {
            num: num,
            next: next,
            last: last,
            articles: articles,
        }

        Category.findAll().then( categories => {
            res.render("admin/articles/page", {
                categories: categories,
                result: result
            })
        })
    })
})

module.exports = router