const Sequelize = require('sequelize')
const sequelize = require('../database/database')

class Article extends Sequelize.Model {}

Article.init(
	{
		id: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		slug: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		body: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		categoryId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: { model: 'categories', key: 'id' },
		},
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
	},
	{ sequelize, tableName: 'articles' }
)

module.exports = Article
