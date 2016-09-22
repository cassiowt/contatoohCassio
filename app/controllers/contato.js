

module.exports = function (app) {
	
	var Contato = app.models.contato;

	var controller = []
	
	controller.listaContatos = function (req, res) {
		//var promisse = Contato.find().exec();
		Contato.find().populate('emergencia').exec()
		.then(
			function (contatos) {
				res.json(contatos)
			},
			function (erro) {
				console.error(erro).
				res.status(500).json(erro);
			}
		);

	};

	
	controller.obtemContato = function (req, res) {
		var _id = req.params.id;
		Contato.findById(_id).exec()
		.then(
			function (contato) {
				if (!contato) throw new Erro("Contato não encontrado");
				res.json(contato);
			},
			function (erro) {
				console.log(erro);
				res.status(404).json(erro);
			}
		);

	};

	controller.removeContato = function (req, res) {
		var _id = req.params.id;
		Contato.remove({"_id" : _id}).exec()
		.then(
			function () {
				res.status(204).end();
			},
			function (erro) {
				return console.error(erro);
			}
		);
	};

	controller.salvaContato = function (req, res) {
		var _id = req.body._id;

		req.body.emergencia - req.body.emergencia || null;

		if(_id) {
			Contato.findByIdAndUpdate(_id, req.body).exec()
			.then(
				function (contato) {
					res.json(contato);
				},
				function (erro) {
					console.erro(erro);
					res.status(500).json(erro);
				}
			);
		} else {
			Contato.create(req.body)
			.then(
				function (contato) {
					res.status(201).json(contato);
				},
				function (erro) {
					console.erro(erro);
					res.status(500).json(erro);
				}
			);
		}
	};

	return controller;

};

/*var ID_CONTATO_INC = 4;
	var controller ={};
	
	controller.listaContatos = function (req, res) {
		res.json(contatos);
	};

	
	controller.obtemContato = function (req, res) {
		var idContato = req.params.id;
		var contato = contatos.filter(function (contato) {
			return contato._id == idContato;
		})[0];
		contato ? 
			res.json(contato) :
			res.status(404).send('Contato não encontrado!');
	};

	controller.removeContato = function (req, res) {
	
		var idContato = req.params.id;
		console.log('API? removendoContato: ' + idContato);

		contatos = contatos.filter(function (contato) {
			return contato._id != idContato;
		});
		res.status(204).end();

	};

	controller.salvaContato = function (req, res) {
		var contato = req.body;
		contato = contato._id ?
			atualiza(contato) :
			adiciona(contato);
		res.json(contato);
	};

	function adiciona(contatoNovo) {
		contatoNovo._id = ++ID_CONTATO_INC;
		contatos.push(contatoNovo);
		return contatoNovo;
	}

	function atualiza(contatoAlterar) {
		contatos = contatos.map(function (contato) {
			if(contato._id == contatoAlterar.id) {
				contato = contatoAlterar;
			}
			return contato;
		});
		return contatoAlterar;
	}
	

	return controller;
*/