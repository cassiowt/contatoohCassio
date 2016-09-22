angular.module('contatooh').controller('ContatosController', 
	function( Contato, $scope ) {
		$scope.contatos = [];
		
		$scope.filtro = '';

		$scope.mensagem = {texto: ''};
		
		function buscaContatos() {
			Contato.query(
				function (contatos) {
					$scope.contatos = contatos;
					$scope.mensagem = {};
				},
				function (erro) {
					console.log(erro);
					console.log("Não foi possível obter a lista de contatos!");
					$scope.mensagem = {
						texto : "Não foi possível obter a lista de contatos!"
					};
				}
			);
		}

		buscaContatos();

		$scope.remove = function (contato) {
			Contato.delete({id: contato._id},
				buscaContatos,
			 	function (erro) {
					console.log(erro);
					console.log("Não foi possivel remover o contato!");
					$scope.mensagem = {
						texto : "Não foi possivel remover o contato!"
					};
			 	}
			);
		};
});