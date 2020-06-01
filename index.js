const express = require('express'),
    app = express(),
    connection = require('./database/database.js'),
    session = require('express-session')

// Getting POST parameters and using JSON
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Setting view engine
app.set('view engine', 'ejs')

// Config for static archives
app.use(express.static('public'))

// Config for session and cookies
app.use(session({
    secret: "anyword",
    cookie: {
        maxAge: 60000
    }
}))

// Connecting with database
connection.authenticate().then(() => {
    console.log('Conexão com o banco feita')
}).catch((erro)=>{
    console.log(erro)
})

// Controllers
const categoriesController = require('./categories/CategoriesController.js'),
    articlesController = require('./articles/ArticlesController.js'),
    usersController = require('./user/UsersController.js')

// Data Models
const Article = require('./articles/Article.js')
const Category = require('./categories/Category.js')

// Parsing controllers
app.use("/", categoriesController)
app.use("/", articlesController)
app.use("/", usersController)


// Routes
app.get('/', (req, res) => {

    Article.findAll({
        order: [['id', 'DESC']],
        limit: 4
        }).then(article => {
        Category.findAll().then(categories => {
            res.render('index', {
                article: article,
                categories: categories,
                result: {next: '1', last: '0', num: 1}
            })
        })

    })
})

app.get("/:slug", (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{
        if(article != undefined ){
            Category.findAll().then(categories => {
                res.render('article', {
                    article: article,
                    categories: categories
                })
            })
        }else{
            res.redirect("/")
        }
    }).catch(erro =>{
        console.log(erro)
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {
                    article: category.articles,
                    categories: categories,
                    result: {
                        next: 0,
                        last: 0 
                    }
                })
            })
        }else {
            res.redirect("/")
        }
    })
})

app.listen('8080', () => {
    console.log('Server iniciado!')
})
