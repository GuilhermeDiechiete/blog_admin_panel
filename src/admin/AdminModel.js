const Sequelize = require('sequelize')
const connection = require('../database/conn')

const AdminModel = connection.define('admin', {

    email: {
        type: Sequelize.STRING,
        allowNull: false 
    }, 
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// atualizar no banco de dados
// APOS CRIAR UMA VEZ A TABELA, REMOVER O COMANDO -> AdminModel.sync({force: true})

module.exports = AdminModel