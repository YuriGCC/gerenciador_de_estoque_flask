from config import *
from modelo.pessoa import Pessoa
from modelo.estoque import Estoque
from modelo.relacionamentos import estoque_pessoa

@app.route("/compartilharEstoque/<int:idEstoque>", methods=['POST','GET'])
@jwt_required()
def compartilharEstoque(idEstoque):
    try:
        dados = request.get_json()
        idPessoa = Pessoa.query.filter_by(email=dados['emailUsuario']).first().id
        query = db.session.query(estoque_pessoa.c.pessoa_id, estoque_pessoa.c.estoque_id)
        estoqueCompartilhado = query.filter(estoque_pessoa.c.estoque_id == idEstoque, 
                                            estoque_pessoa.c.pessoa_id == idPessoa).first()

        if estoqueCompartilhado:
            return jsonify({'resultado':'compartilhado'})
        else:
            estoque = Estoque.query.filter_by(id=idEstoque).first()
            usuario = Pessoa.query.filter_by(email=dados['emailUsuario']).first()
            usuario.estoques_pessoa.append(estoque)
            db.session.commit()

            return jsonify({'resultado':'sucesso'})

    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})