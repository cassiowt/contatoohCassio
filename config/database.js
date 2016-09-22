//var bson = require('bson');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function (uri) {
	mongoose.connect(uri);


	mongoose.connection.on('connected', function () {
		console.log('Mongoose! Conectado em ' + uri)
	});

	mongoose.connection.on('disconnectee', function () {
		console.log('Mongoose! Desconectado de ' + uri)
	});

	mongoose.connection.on('error', function () {
		console.log('Mongoose! Erro na conexão ' + erro)
	});

	process.on('SIGINT', function () {
		mongoose.connection.close(function () {
			console.log('Mongoose! Desconectado pelo terminio da aplicação');
		process.exit(0);
		});
	});

}