$(function () {

    $(document).on("click", "#registroBotao", function () {
        var vetor_dados = $("#form").serializeArray();
        var chave_valor = {};
        
        for (var i = 0; i < vetor_dados.length; i++) {
            chave_valor[vetor_dados[i]['name']] = vetor_dados[i]['value'];
        }
        var dados_json = JSON.stringify(chave_valor);

        // verificando se existe o email tentado
        var verificacaoEmail = $.ajax({
            url: `http://localhost:5000/checagem/email/${chave_valor['email']}`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados_json
        });

        verificacaoEmail.done(function (retorno) {
            try {
                if (retorno.existe == "nao") {

                    // se nao existir realiza o cadastro
                    var acao = $.ajax({
                        url: `http://localhost:5000/registro/Pessoa`,
                        method: 'POST',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: dados_json
                    });

                    acao.done(function (retorno) {
                            try {
                            if (retorno.resultado == "ok") {
                                window.location.href = "/frontend/html/index.html"
                            } else {
                                alert("Erro: " + retorno.detalhes);
                            }
                        } catch (error) {
                            alert("Erro ao tentar fazer o ajax: " + error +
                                "\nResposta da ação: " + retorno);
                        }
                    });
                } else {
                    alert('email já existe!');
                }
            } catch (error) {
                alert("Erro ao tentar fazer o ajax: " + error +
                    "\nResposta da ação: " + retorno);
            }
        });
    });
});