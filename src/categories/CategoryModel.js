const Sequelize = require('sequelize')
const connection = require('../database/conn')

const CategoryModel = connection.define('categories', {

    title: {
        type: Sequelize.STRING,
        allowNull: false 
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// atualizar no banco de dados
// APOS CRIAR UMA VEZ A TABELA, REMOVER O COMANDO -> CategoryModel.sync({force: true})

module.exports = CategoryModel