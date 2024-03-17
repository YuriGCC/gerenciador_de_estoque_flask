import win32com.client as win32
from config import *
from modelo import pessoa
from utilidades.criptografar import descriptografar 

def enviarSenha(destinatario):
    with app.app_context():
        usuarioAvulso = pessoa.Pessoa.query.filter_by(email=destinatario).first()

    if usuarioAvulso:
            usuarioNome = usuarioAvulso.nome
            usuarioSenha = usuarioAvulso.senha
    else:
        return 'email não encontrado'
    outlook = win32.Dispatch('outlook.application')
    email = outlook.CreateItem(0)
    email.To = destinatario
    email.Subject = "Recuperar senha Mystock"
    email.HTMLBody = f"""
             <h1>Olá  {usuarioNome} =)</h1>

             <p style="font-size: 30px;">A sua senha é {descriptografar(usuarioSenha)}!</p>

             <p style="font-size: 15px;">Att, MyStock</p>

            """
    email.Send()
    return 'enviado'

