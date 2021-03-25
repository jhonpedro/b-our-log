const Sequelize = require('sequelize')
const sequelize = require('../database/database')

class Category extends Sequelize.Model {}

Category.init(
	{
		title: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		slug: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
	},
	{ sequelize, tableName: 'categories' }
)

module.exports = Category
