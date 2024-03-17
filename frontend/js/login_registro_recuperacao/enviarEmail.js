$(function () {
    $(document).on("click", "#recuperarBotao", function () {
        var email = $("#recuperarSenhaInput").val();
        
        var envio = $.ajax({
            url: `http://localhost:5000/envioSenha/${email}`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        });
    
        envio.done(function(resultado) {
            try {
                if (resultado.retorno == "sucesso") {
                    alert('cheque seu email')
                } 
            } catch (error) {
                alert("Erro ao tentar fazer o ajax: " + error +
                    "\nResposta da ação: " + retorno);
            }
        });
    });
});