'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				auto_increment: true,
				primary_key: true,
			},
			name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},

			// Timestamps
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('users')
	},
}
