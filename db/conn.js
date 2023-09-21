const Sequelize = require('sequelize')

const connection = new Sequelize('blogadm', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection