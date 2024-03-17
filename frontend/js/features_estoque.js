// função para adicionar linhas na tabela (precisa ser carregada previamente)
var numeroLinha = 0;
var itens = []
var itensExcluidos = []
var itensModificados = {}
var itensAdicionados = {}
var colunasEstoque = []
var informacaoAntiga;

// nota: carregarLinhasJaExistentes é booleana
function adicionarLinhaNaTabela(estoque, carregarLinhasJaExistentes) {
    for (var chave in estoque) {
        var linha = ''
        var numeroDeItens = 0

        if (carregarLinhasJaExistentes) {
            // pegando o array de cada coluna do estoque
            for(chave in estoque) {
                for (dicionario in estoque[chave]) {
                    numeroDeItens = estoque[chave][dicionario].length
                    itens.push(estoque[chave][dicionario])
                }
                
                // adicionando linhas e o numero delas
                for (let index = 0; index < numeroDeItens; index++) {
                    numeroLinha +=1;
                    $('.itensEstoque').append(`
                            <tr id="${index}Tr">
                                <th scope="col">${numeroLinha}</th>
                            </tr>`);
                }
                    
                // adicionando todos os itens a linha
                itens.forEach(array => {
                    for (let index = 0; index < array.length; index++) {
                        const item = array[index];
                        $(`#${index}Tr`).append(`<td class='celulaTabela'>${item}</td>`)
                    }

                })
                // adicionando os botoes de excluir
                for (let index = 0; index < numeroDeItens; index++) {
                    $(`#${index}Tr`).append(`
                    <td class="text-center">
                        <button class="btn btn-danger botaoExcluir">X</button>
                    </td>`)
                }
            }
        }
        else {

            // pegando os valores dos inputs
            var valoresInput = []
            for (var coluna in estoque[chave]) {
                valorInput = $(`#${coluna}Input`).val();
                valoresInput.push(valorInput)
            }
        
            // adicionando valores na tabela
            for (let i=0; i < valoresInput.length; i++) {
                valor = valoresInput[i]
                linha += `<td class='celulaTabela'>${valor}</td>`
            }

            $('.itensEstoque').append(`
            <tr>
                <th scope="col">${numeroLinha}</th>
                ${linha}
                <td class="text-center"><button class="btn btn-danger botaoExcluir">X</button></td>
            </tr>`)
        }
        
    }
    numeroLinha +=1
}

$(function () {
    id = sessionStorage.getItem('idDoEstoque')
    jwt=  sessionStorage.getItem('jwt')
    tipo = sessionStorage.getItem('tipo')

    if (tipo =='pessoa') {
        $.ajax({
            url: `http://localhost:5000/consultaComLogin/estoque/${id}`,
            dataType: 'json',
            method: 'GET',
            contentType: 'application/json',
            headers: { Authorization: 'Bearer ' + jwt },
            success: montarPaginaPessoa,
            error: function (xhr, status, error) {
                alert("Erro na conexão, verifique o backend. " + xhr.responseText + " - " + status + " - " + error);
            }
        });
    }
    
    function montarPaginaPessoa(resultado) {
        // as informacoes sao recebidas como string, convertendo para json
        estoque = JSON.parse(resultado.estoque)
        // armazenando estoque no browser do usuario para uso futuro após essa função
        sessionStorage.setItem('estoque', resultado.estoque)

        // adicionando estrutura inicial do html
        $('main').append(`
                <div class="row">
                    <div class="row modificacaoItens mt-3 mr-2 w-auto">
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <table class="table table-dark table-striped">
                                <thead>
                                    <tr class="colunasEstoque"></tr>
                                </thead>
                                <tbody class="itensEstoque"></tbody>
                        </table>
                    </div>
                </div>
        `)

        // adicionando informações do estoque na página
        // colunas padrão enumerar linhas
        $('.colunasEstoque').append('<th scope="col-auto">Id</th>')
        for (var chave in estoque) {
            // nome do estoque no titulo da pagina
            $('.titleEstoque').append(chave)
            for (var coluna in estoque[chave]) {
                // colunas do estoque na tabela
                // coluna para o numero da linha
                colunaTh = `<th scope="col">${coluna}</th>`
                $('.colunasEstoque').append(colunaTh)
                colunasEstoque.push(coluna)

                // inputs
                input = `<div class='col-auto m-2 input-group'>
                            <span class="input-group-text" id='${coluna}Complemento'>${coluna}</span>        
                            <input type='text' id='${coluna}Input' class='form-control' placeholder='insira ${coluna} aqui' 
                            aria-label='insira ${coluna} aqui' aria-describedby='${coluna}Complemento'>
                         </div>`
                $('.modificacaoItens').append(input)
            }

            $('.modificacaoItens').append(`
                <div style="margin-left: 20px" class="mb-2">
                    <button id="adicionarAoEstoque" class="btn btn-warning">Adicionar</button>
                    <button class="btn btn-success botaoSalvar">Salvar</button>
                    <button class="btn btn-danger botaoExcluirEstoque">Excluir</button>
                </div>
                <div class="row caixaSalvarAlteracoes" style="display: none;">
                    <div class="col-auto">
                        <p>Salvar alterações?</p>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-success btnSimSalvar">sim</button>
                        <button class="btn btn-danger btnNaoSalvar">não</button>
                    </div>
                </div>
                <div class="row caixaExcluirEstoque" style="display: none;">
                    <div class="col-auto">
                        <p>Excluir estoque?</p>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-success btnSimExcluir">sim</button>
                        <button class="btn btn-danger btnNaoExcluir">não</button>
                    </div>
                </div>
            `)

            // adição dos itens já salvos no banco de dados
            adicionarLinhaNaTabela(estoque, true)

            // adição de uma coluna final para exclusão da linha
            $('.colunasEstoque').append('<th scope="col-auto"></th>')
        }
    }

    // adição da linha ao estoque
    $(document).on('click','#adicionarAoEstoque', function() {
        estoque = JSON.parse(sessionStorage.getItem('estoque'))
        adicionarLinhaNaTabela(estoque, false)

        // adicionando a lista dos itens que devem ser adicionados ao salvar
        for (chave in estoque) {
            for (var coluna in estoque[chave]) {
                valorInput = $(`#${coluna}Input`).val();

                if (!(coluna in itensAdicionados)) {
                    itensAdicionados[coluna] = [valorInput]
                } else {
                    itensAdicionados[coluna].push(valorInput)
                }
            }
        }
    });

    // evento para apagar a linha ao clicar no X
    $(document).on('click', '.botaoExcluir', function () {
        // pegando o avô do botao clicado e os itens da linha que serão removidos ao salvar
        var avo = $(this).parent().parent();
        var valoresDaLinha = avo.find('.celulaTabela')

        valoresDaLinha.each(function() {
            var itemDaCelula = $(this).text();
            itensExcluidos.push(itemDaCelula)
        });
        avo.remove();
    });
    
    // evento para editar os dados de uma coluna
    $(document).on('click','.itensEstoque td', function () {
        $(this).attr('contentEditable', true);
        $(this).focus();

        informacaoAntiga = $(this).text()
        $(this).on("blur", function() {
            var novaInformacao = $(this).text()
            var indexColuna = $(this).index();
            var nomeColuna = $('th').eq(indexColuna).text();

            // Verifica se a coluna já existe nos itensModificados
            if (!itensModificados[nomeColuna]) {
                itensModificados[nomeColuna] = [];
            }
            // Adiciona as informações modificadas
            itensModificados[nomeColuna].push({
                'informacaoAntiga': informacaoAntiga,
                'informacaoNova': novaInformacao
            });
        });
    });

    // mostra a caixa de confirmação ao salvar
    $(document).on('click', '.botaoSalvar', function() {
        // mostra a caixa de confirmação
        if($('.caixaExcluirEstoque').attr('display') == 'none') {
            $('.caixaSalvarAlteracoes').css('display', 'contents');
        } else {
            $('.caixaExcluirEstoque').css('display', 'none');
            $('.caixaSalvarAlteracoes').css('display', 'contents');
        }
        

    });

    $(document).on("click", ".btnSimSalvar", function () {
        var idDoEstoque = sessionStorage.getItem('idDoEstoque')
        // adiciona itens
        if (Object.keys(itensAdicionados).length != 0) {           
            itensAdicionados = JSON.stringify(itensAdicionados) 
            $.ajax({
                url: `http://localhost:5000/registroItemEstoque/${idDoEstoque}`,
                dataType: 'json',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: itensAdicionados,
                headers: { Authorization: 'Bearer ' + jwt },
                error: function (xhr, status, error) {
                    alert("Erro na conexão, verifique o backend. " + xhr.responseText + " - " + status + " - " + error);
                }
            });
        }

        // exclui itens
        if (itensExcluidos.length > 0) {
            itensExcluidos = JSON.stringify({'excluidos': itensExcluidos}) 
            $.ajax({
                url: `http://localhost:5000/excluirItemEstoque/${idDoEstoque}`,
                dataType: 'json',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: itensExcluidos,
                headers: { Authorization: 'Bearer ' + jwt },
                error: function (xhr, status, error) {
                    alert("Erro na conexão, verifique o backend. " + xhr.responseText + " - " + status + " - " + error);
                }
            });
        }

        // modifica itens
        if (Object.keys(itensModificados).length != 0) {
            itensModificados = JSON.stringify(itensModificados) 
            $.ajax({
                url: `http://localhost:5000/editarItemEstoque/${idDoEstoque}`,
                dataType: 'json',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: itensModificados,
                headers: { Authorization: 'Bearer ' + jwt },
                error: function (xhr, status, error) {
                    alert("Erro na conexão, verifique o backend. " + xhr.responseText + " - " + status + " - " + error);
                }
            });
        }
        $('.caixaSalvarAlteracoes').css('display', 'none');
    });

    // reseta todas as modificações ao clicar em não (simplesmente atualizando a pagina)
    $(document).on("click", ".btnNaoSalvar", function () {
        window.location = '/frontend/html/estoque.html';
    });

    // mostra a caixa de excluir estoque
    $(document).on('click', '.botaoExcluirEstoque', function() {
        // mostra a caixa de confirmação
        if ($('.caixaSalvarAlteracoes').attr('display') == 'none') {
            $('.caixaExcluirEstoque').css('display', 'contents');
        } else {
            $('.caixaSalvarAlteracoes').css('display', 'none');
            $('.caixaExcluirEstoque').css('display', 'contents');
        }
        
    });

    // fecha a caixa de exclusão do estoque
    $(document).on('click', '.btnNaoExcluir', function() {
        $('.caixaExcluirEstoque').css('display', 'none');
    });

    // exclui o estoque
    $(document).on('click', '.btnSimExcluir', function() {
        var idDoEstoque = sessionStorage.getItem('idDoEstoque')
        $.ajax({
            url: `http://localhost:5000/excluirEstoque/${idDoEstoque}`,
            method: 'POST',
            headers: { Authorization: 'Bearer ' + jwt }
        });

        window.location = '/frontend/html/home.html';
    });
});