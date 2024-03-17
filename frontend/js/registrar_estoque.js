var colunas = [];
var id = 0;
// adição da coluna id
$(".itemEstoque").append(`<tr>` + `<th scope="row">${id}</th>` +  "</tr>");

// adiciona a coluna à amostra de como ficará representado o estoque
$(document).on("click", "#adicionarInformacaoEstoque", function () {
    var coluna = $("#colunaEstoque").val().split(' ').join('');     

    if (colunas.includes(coluna)) {
        alert("Estoque já possui este valor.")
    } else if($("#colunaEstoque").val().length == 0) {
        alert("O campo coluna está vazio.")
    }  else {
        colunas.push(coluna);
        coluna = `<th id=${id} scope="col">${coluna}</th>`;
        item = `<td id=${id} scope="row">item</td>`;
    
        $(".colunaEstoque").append(coluna);
        $(".itemEstoque").append(item)
        
        id +=1;
    }
});

// mostra a caixa de confirmação ao terminar o estoque
$(document).on("click", "#terminarEstoque", function () {
    $('.caixaDeConfirmacao').css('display', 'contents');
});

// registra o estoque ao concluir
$(document).on("click", ".btnSim", function () {
    nomeEstoque = $('#nomeEstoque').val();
    usuario = sessionStorage.getItem('login')
    jwt = sessionStorage.getItem("jwt");
    tipo = sessionStorage.getItem('tipo')
    if (nomeEstoque.length === 0) {
        alert('O estoque precisa de um nome')
    } else if (colunas.length == 0) {
        alert('O estoque precisa de no minimo uma coluna')
    } else {
        var dados_json = JSON.stringify({ nome: nomeEstoque, colunasEstoque: colunas, usuarioEmail: usuario});
        var cadastroEstoque = $.ajax({
            url: `http://localhost:5000/${tipo}/registroEstoque`,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            headers: { Authorization: 'Bearer ' + jwt },
            data: dados_json
        });
    
        cadastroEstoque.done(function (retorno) {
            try {
                if (retorno.resultado == "sucesso") {
                    window.location.replace("/frontend/html/home.html");
                } else {
                    alert('Erro:' + retorno);
                }
            } catch (error) {
                alert("Erro ao tentar fazer o ajax: " + error +
                    "\nResposta da ação: " + retorno);
            }
        });
    }
});

// esconde a caixa de confirmação ao clicar em não
$(document).on("click", ".btnNao", function () {
    $('.caixaDeConfirmacao').css('display', 'none');
});

// remove a informação indesejada 
$('.colunaEstoque').dblclick(function (e) {
    id = e.target.id
    console.log($(`#${id}`).html())
    colunas.pop($(`#${id}`).html())
    console.log(colunas)

    $(`#${id}`).remove()
    $(`#${id}`).remove()
});

$('.itemEstoque').dblclick(function (e) {
    id = e.target.id
    colunas.pop($(`#${id}`).html())
    $(`#${id}`).remove()
    $(`#${id}`).remove()
});
