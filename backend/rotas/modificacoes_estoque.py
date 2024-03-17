from modelo.estoque import *

@app.route("/registroItemEstoque/<int:idEstoque>", methods=['POST'])
@jwt_required()
def registroItemEstoque(idEstoque):
    dados = request.get_json()  
    try:
        estoque = Estoque.query.filter_by(id=idEstoque).first()
        estoque_json = json.loads(estoque.informacoes_estoque)
        nomeEstoque = list(estoque_json.keys())[0]

        for chave, valores in dados.items():
            for item in valores:
                estoque_json[nomeEstoque][chave].append(item)

        estoque.informacoes_estoque = json.dumps(estoque_json)
        db.session.commit()

    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})
    
    return '', 204

@app.route("/excluirItemEstoque/<int:idEstoque>", methods=['POST'])
@jwt_required()
def excluirItemEstoque(idEstoque):
    dados = request.get_json()  
    try:
        estoque = Estoque.query.filter_by(id=idEstoque).first()
        estoque_json = json.loads(estoque.informacoes_estoque)
        nomeEstoque = list(estoque_json.keys())[0]
        estoqueColunas = estoque_json[nomeEstoque]
        valores_a_remover = dados['excluidos']

        for coluna in estoqueColunas:
            for valor_a_remover in valores_a_remover:
                if valor_a_remover in estoque_json[nomeEstoque][coluna]:
                    estoque_json[nomeEstoque][coluna].remove(valor_a_remover)

        estoque.informacoes_estoque = json.dumps(estoque_json)
        db.session.commit()

    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})
    
    return '', 204

@app.route("/editarItemEstoque/<int:idEstoque>", methods=['POST'])
@jwt_required()
def editarItemEstoque(idEstoque):
    dados = request.get_json()  
    try:
        estoque = Estoque.query.filter_by(id=idEstoque).first()
        estoque_json = json.loads(estoque.informacoes_estoque)
        nomeEstoque = list(estoque_json.keys())[0]

        for colunaEstoque in estoque_json[nomeEstoque]:
            if colunaEstoque in list(dados.keys()):
                for dicionario in dados[colunaEstoque]:
                    if dicionario['informacaoAntiga'] in estoque_json[nomeEstoque][colunaEstoque]:
                        index = 0
                        for elemento in estoque_json[nomeEstoque][colunaEstoque]:
                            if elemento == dicionario['informacaoAntiga']:
                                estoque_json[nomeEstoque][colunaEstoque].remove(elemento)
                                estoque_json[nomeEstoque][colunaEstoque].insert(index,dicionario['informacaoNova'])
                                break

                            index +=1
        estoque.informacoes_estoque = json.dumps(estoque_json)
        db.session.commit()
        
    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})
    
    return '', 204

@app.route("/excluirEstoque/<int:idEstoque>", methods=['POST'])
@jwt_required()
def excluirEstoque(idEstoque):
    try:
        estoque = Estoque.query.filter_by(id=idEstoque).first()
        db.session.delete(estoque)
        db.session.commit()

    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})

    return '', 204