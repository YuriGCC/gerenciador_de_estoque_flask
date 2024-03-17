from modelo.estoque import *
from modelo.pessoa import *

@app.route("/consultaComLogin/<string:tipo>/<string:dado>", methods=['GET','POST'])
@jwt_required()
def consultaComLogin(tipo, dado):
    try:

        if tipo == 'estoque':
            estoque = Estoque.query.filter_by(id=dado).first()
            resposta = jsonify({'estoque': estoque.informacoes_estoque})

        if tipo == 'email':
            usuario = Pessoa.query.filter_by(email=dado).first()
            if usuario:
                resposta = jsonify({'resultado': 'existe'})
            else:
                resposta = jsonify({'resultado': 'não existe'})

    except Exception as e:
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
        print("ERRO: "+str(e))

    return resposta