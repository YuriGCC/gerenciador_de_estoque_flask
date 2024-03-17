Projeto criado durante o ensino médio em 2023 para uma disciplina, o projeto se trata de um site que permite ao usuário criar e gerenciar estoques customizáveis e compartilha-los com os usuários que desejar para que também gerenciem o estoque.  

Para uso, algumas dependências precisam ser instaladas na máquina, abaixo está a lista:
- Python 3 ou superior
- flask
- flask_sqlalchemy
- flask_cors
- flask_jwt_extended
- win32com.client, para usuários do windows.

Nota: Para usuários de sistemas operacionais diferentes do windows, a opção de recuperar a senha não funcionará pois a biblioteca usada é exclusiva do windows, se este for o caso, considere remover o arquivo backend/utilidades/envio_email_com_senha.py e no arquivo backend/utilidades/__init__.py remover da lista o elemento 'envio_email_com_senha'. Para o funcionamento da recuperação de senha também é necessário estar logado no Outlook na sua máquina.

Modo de uso:
Execute o arquivo backend/executar_backendy.py, e em um novo terminal acesse a pasta do projeto e execute o comando python -m http. server

