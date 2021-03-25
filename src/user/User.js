const Sequelize = require('sequelize')
const sequelize = require('../database/database.js')

class User extends Sequelize.Model {}

User.init(
	{
		id: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
	},
	{ sequelize, tableName: 'users' }
)

module.exports = User
