const Sequelize = require('sequelize')

const sequelize = new Sequelize('b_our_log', 'root', '12345', {
	host: 'localhost',
	dialect: 'mysql',
	timezone: '-03:00',
})

module.exports = sequelize
