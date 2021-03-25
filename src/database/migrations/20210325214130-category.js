'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('categories', {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			slug: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			// Timestamps
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('categories')
	},
}
