import base64

def criptografar(senha):
    encoded_string = base64.b64encode(senha.encode("utf-8")).decode("utf-8")
    return encoded_string

def descriptografar(senha):
    senha_descodificada = base64.b64decode(senha)
    senha_convertida_para_utf8 = senha_descodificada.decode('UTF-8')
    return senha_convertida_para_utf8

def valida_senha(cifrado, senha_fornecida):
    fornecida = criptografar(senha_fornecida)
    if cifrado == fornecida:
         return True
    return False