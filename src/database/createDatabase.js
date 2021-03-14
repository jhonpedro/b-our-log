const mysql = require('mysql2/promise')
mysql
	.createConnection({
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: '12345',
	})
	.then((connection) => {
		connection
			.query('CREATE DATABASE IF NOT EXISTS b_our_log;')
			.then(() => {
				console.info('Database created successfully!')
			})
			.catch((error) => {
				console.info('there was an error in creating the database: ' + error)
				process.exit(1)
			})
			.finally(() => {
				process.exit(0)
			})
	})
