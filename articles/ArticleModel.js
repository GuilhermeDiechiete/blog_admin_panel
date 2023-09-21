const Sequelize = require('sequelize')
const connection = require('../db/conn')


// relacionamento com...
const CategoryModel = require('../categories/CategoryModel')

const ArticleModel = connection.define('articles', {

    title: {
        type: Sequelize.STRING,
        allowNull: false 
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// relacionamento
CategoryModel.hasMany(ArticleModel)// 1 categoria tem muitos artigos ( 1 para Muitos)
ArticleModel.belongsTo(CategoryModel) // 1 artigo pertence a uma categoria ( 1 para 1)

// atualizar no banco de dados
// APOS CRIAR UMA VEZ A TABELA, REMOVER O COMANDO -> ArticleModel.sync({force: true})

module.exports = ArticleModel