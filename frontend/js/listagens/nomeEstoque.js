$(function () {
    tipo = sessionStorage.getItem('tipo');
    email = sessionStorage.getItem('login');
    jwt = sessionStorage.getItem('jwt');

    var requisicaoNomeEstoques = $.ajax({
        url: `http://localhost:5000/listarNomeEIdEstoques/${tipo}/${email}`,
        method: 'GET',
        headers: { Authorization: 'Bearer ' + jwt },
        dataType: 'json',
        contentType: 'application/json'
    });

    requisicaoNomeEstoques.done(function(resultado) {
        try {
            if (resultado.retorno == "sucesso") {

                // transformando os resultados em array
                let arrayEstoques = Array.from(resultado.estoques);
                let arrayIds = Array.from(resultado.ids)
                for (let index = 0; index < arrayEstoques.length; index++) {

                    // adicionando a opção do nome e id do estoque na opção 
                    var estoque = arrayEstoques[index];
                    nome_estoque = `<div class="col-md-4">
                                        <a class="btn btn-lg opcaoEstoque bg-patternOrange" 
                                        href='/frontend/html/estoque.html' id=${arrayIds[index]}>${estoque}<a/>  
                                    </div>`
                    $('.listaDeEstoques').append(nome_estoque)
                }
            }
        } catch (error) {
            alert("Erro ao tentar fazer o ajax: " + error +
                "\nResposta da ação: " + resultado);
        }
    });
});

// captura o id do estoque clicado e armazena
$(document).on("click", ".listaDeEstoques", function(e){
    sessionStorage.setItem('idDoEstoque', e.target.id)
});
