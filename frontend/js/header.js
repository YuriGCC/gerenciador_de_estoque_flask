// funcionalidades do header

// botao de deslogar
var nome = sessionStorage.getItem("nome");
$('.nome').append(nome)

$(document).on("click", ".logout", function () {
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('jwt');
    window.location = '/frontend/html/index.html';
});

login = sessionStorage.getItem('login');
jwt = sessionStorage.getItem("jwt");
tipo = sessionStorage.getItem("tipo")

$.ajax({
    url: `http://localhost:5000/listarNoHeader/${tipo}/${login}`,
    dataType: 'json',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + jwt },
    success: listarNoHeader,
    error: function () {
        alert("erro ao ler dados, verifique o backend");
}
});
function listarNoHeader(retorno) {
    tipoDeUsuario = sessionStorage.getItem('tipo')
    if (retorno.resultado == 'ok') {
        if (tipoDeUsuario == 'pessoa') {
            $('.nome').append(retorno.dadosDoHeader)
        }
    } else {
        alert("Erro: " + retorno.detalhes);
    }
}

function registrarEstoque() {
    window.location.replace("/frontend/html/criar_estoque.html");
}

function voltarHome() {
    window.location.replace("/frontend/html/home.html");
}

function compartilharEstoque() {
    var emailUsuarioCompartilhado = window.prompt('Digite o email do usuário')

    // verificando se o email digitado não é do próprio usuário
    if (emailUsuarioCompartilhado == login) {
        alert('você digitou seu próprio email!')
    } else {
        // verificando se o email existe
        var verificacaoEmailExiste = $.ajax({
            url: `http://localhost:5000/consultaComLogin/email/${emailUsuarioCompartilhado}`,
            dataType: 'json',
            contentType: 'application/json',
            headers: { Authorization: 'Bearer ' + jwt }
        });

        verificacaoEmailExiste.done(function (retorno) {
            if (retorno.resultado == 'existe') {
                // se o usuário não existir, compartilha o estoque
                idEstoque = sessionStorage.getItem('idDoEstoque')
                dados = JSON.stringify({'emailUsuario': emailUsuarioCompartilhado})

                var compartilhamento = $.ajax({
                    url: `http://localhost:5000/compartilharEstoque/${idEstoque}`,
                    method: 'POST',
                    headers: { Authorization: 'Bearer ' + jwt },
                    dataType: 'json',
                    contentType: 'application/json',
                    data: dados
                });

                compartilhamento.done(function (retorno) {
                    try {
                        if(retorno.resultado == 'compartilhado') {
                            alert('Este usuário já possui este estoque.')
                        } else if (retorno.resultado == 'sucesso') {
                            alert('Compartilhado')
                        }
                    } catch (error) {
                        alert("Erro ao tentar fazer o ajax: " + error +
                            "\nResposta da ação: " + retorno);
                    }
                });

            } else if(retorno.resultado == 'não existe') {
                alert('usuario não existe')
            }
        });
    }

}