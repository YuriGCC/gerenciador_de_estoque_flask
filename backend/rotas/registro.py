from modelo.pessoa import *
from modelo.estoque import *
from utilidades.criptografar import criptografar

@app.route("/registro/<string:classe>", methods=['POST'])
def incluir(classe):
    dados = request.get_json()  
    try:  
        nova = None
        if classe == "Pessoa":
            dados['senha'] = criptografar(dados['senha'])
            nova = Pessoa(**dados)

        db.session.add(nova)
        db.session.commit()

        return jsonify({"resultado": "ok", "detalhes": "ok"})
    
    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})

@app.route("/<string:tipo>/registroEstoque", methods=['POST'])
@jwt_required()
def registroEstoque(tipo):
    dados = request.get_json()  
    try:
        nomeEstoque = dados['nome']
        lista = dados['colunasEstoque']
        dict = {}
        for item in lista:
            dict.update({item:[]})

        if tipo == 'pessoa':
            usuario = Pessoa.query.filter_by(email=dados['usuarioEmail']).first()
                
            novo_estoque = Estoque(informacoes_estoque=json.dumps({ nomeEstoque: dict}))
            usuario.estoques_pessoa.append(novo_estoque)
            db.session.add(novo_estoque)
            db.session.commit()
    
        return jsonify({"resultado": "sucesso"})

    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})
    