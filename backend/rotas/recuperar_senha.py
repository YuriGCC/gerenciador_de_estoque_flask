from utilidades.envio_email_com_senha import enviarSenha
from config import *
import pythoncom

@app.route("/envioSenha/<string:email>", methods=['POST'])
def envioSenha(email):
    try:
        # é necessário chamar o coInitialize pois é necessária a execução de múltiplas tasks ao mesmo tempo
        # (conexão com outlook e processamento da rota no backend ao mesmo tempo)
        pythoncom.CoInitialize()
        if enviarSenha(email) == 'enviado':
             return jsonify({'retorno': 'sucesso'})
        
    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})