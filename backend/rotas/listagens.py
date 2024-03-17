from modelo.pessoa import *
from modelo.estoque import *

@app.route("/listarNoHeader/<string:tipo>/<string:emailRecebidoRota>", methods=['GET','POST'])
@jwt_required()
def listarNoHeader(tipo, emailRecebidoRota):
    try:
        dados = None
        dadosUsuario = None
        if tipo == "pessoa":
            dados = db.session.query(Pessoa).filter_by(email=emailRecebidoRota).first()
            dadosUsuario = dados.json()['nome']

        resposta = jsonify({"resultado":"ok","dadosDoHeader":dadosUsuario})

    except Exception as e:
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
        print("ERRO: "+str(e))

    return resposta

@app.route("/listarNomeEIdEstoques/<string:tipo>/<string:emailRecebidoRota>", methods=['GET','POST'])
@jwt_required()
def listarNomeEstoques(tipo,emailRecebidoRota):
    try:
        if tipo == 'pessoa':
            usuario = Pessoa.query.filter_by(email=emailRecebidoRota).first()

            estoques = [estoque.json()   for estoque in usuario.estoques_pessoa]
            idsLista = [estoque.id for estoque in usuario.estoques_pessoa]

            nomesEstoque = []
            for dicionario in estoques:
                for chave in dicionario:
                    nomesEstoque.append(chave)

        resposta = jsonify({'retorno':'sucesso', 'estoques': nomesEstoque, 'ids': idsLista})

    except Exception as e:
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
        print("ERRO: "+str(e))

    return resposta