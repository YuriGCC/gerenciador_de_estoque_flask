from config import *
from modelo.pessoa import *

@app.route("/checagem/<string:tipo>/<string:dado>", methods=['GET','POST'])
def checagem(tipo, dado):
    try:
        if tipo == 'email':
            encontradoEmPessoa = Pessoa.query.filter_by(email=dado).first()
            if encontradoEmPessoa:
                resposta = jsonify({"existe":"sim"})
            else:
                resposta = jsonify({"existe": "nao"})

    except Exception as e:
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
        print("ERRO: "+str(e))

    return resposta
