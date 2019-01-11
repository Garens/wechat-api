const sequelize = require('sequelize');
const config = require('../config');

module.exports = new sequelize(
    config.mysql.db, 
    config.mysql.user,
    config.mysql.pass,
    {
        host: config.mysql.host,
        port: config.mysql.port,
        dialect: 'mysql',
        loggin: false,
        define: {
            underscored: true,
            timezone: "+08:00",
            timestamps: false
        }
    }
);
