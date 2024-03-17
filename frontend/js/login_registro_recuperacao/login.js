// abrir e fechar a div para recuperar senha 
const btn = document.querySelector("#esqueceuBotao");
btn.addEventListener("click", function(e) {
  e.preventDefault();
});

function abrirFechar() {

    const divsEmail = document.getElementsByClassName("recuperarSenha")
    for (const div of divsEmail) {
        if (div.style.visibility == "hidden"){
            div.style.visibility = "visible"
        } 
        else {
            div.style.visibility = "hidden"
        }
    }
}

// validacao login
$(function () {
    $(document).on("click", "#botaoLogin", function () {
        var login = $("#email").val();
        var senha = $("#senha").val();
        var dados = JSON.stringify({ email: login, senha: senha });

        $.ajax({
            url: 'http://localhost:5000/login',
            method: 'POST', 
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: loginOk,
            error: function (xhr, status, error) {
                alert("Erro na conexão, verifique o backend. " + xhr.responseText + " - " + status + " - " + error);
            }
        });
        function loginOk(retorno) {
            if (retorno.resultado == "ok") {
                sessionStorage.setItem('login', retorno.email);
                sessionStorage.setItem('jwt', retorno.detalhes);
                sessionStorage.setItem('tipo', retorno.tipo);
                window.location = '/frontend/html/home.html';

            } else {
                alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
            }
        }

    });
});

