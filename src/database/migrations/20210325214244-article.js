'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('articles', {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				auto_increment: true,
				primary_key: true,
			},
			title: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			slug: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			body: {
				type: Sequelize.DataTypes.STRING,
			},
			categoryId: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'categories', key: 'id' },
			},
			// Timestamps
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('articles')
	},
}
