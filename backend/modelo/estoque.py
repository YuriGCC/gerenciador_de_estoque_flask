from config import *
from modelo.relacionamentos import *

class Estoque(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    informacoes_estoque = db.Column(db.Text)
    
    def __str__(self):
        return f'[id:{self.id}]: {self.json()}'
    
    def json(self):
        if self.informacoes_estoque:
            try:
                return json.loads(self.informacoes_estoque)
            except json.JSONDecodeError as e:
                return f'{"Erro": e}'
        else:
            return None