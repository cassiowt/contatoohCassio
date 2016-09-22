var MongoClient = require('mongodb').MongoClient;
var ObjectID    = require('mongodb').ObjectID;
bson = require('bson');

var _idProcurado = new ObjectID('57db16663bfd1bbeeb780ca2'); //57e02c7f1b88f48995f4fbbb

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh',
	function (erro, db) {
		if(erro) throw err;
		db.collection('contatos').findOne( {_id : _idProcurado},
			function (erro, contato) {
				if(erro) throw err;
				console.log(contato);
			}
		);
	}
);
