from utilidades.criptografar import *
from modelo.pessoa import *

@app.route("/login", methods=['POST'])
def login():
    dados = request.get_json()
    login = dados['email']
    pessoa = Pessoa.query.filter_by(email=login).first()
    
    if pessoa:
        access_token = create_access_token(identity=login)
        email = pessoa.json()['email']
        resposta =  jsonify({"resultado":"ok", "detalhes":access_token, "email": email, 'tipo':'pessoa'})
        
    else:
        resposta = jsonify({"resultado": "erro", "detalhes":"usuario ou senha incorreto(s)"})
   
    return resposta 
