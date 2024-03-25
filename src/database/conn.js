const Sequelize = require('sequelize');

const connection = new Sequelize('blog_adm', 'postgres', '123456', {
    host: '127.0.0.1',
    dialect: 'postgres', 
    timezone: '-03:00',
    port: 5432, 
    logging: false, 
});

module.exports = connection;
