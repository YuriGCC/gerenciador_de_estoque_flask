from config import *
from modelo.relacionamentos import estoque_pessoa

class Pessoa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.Text)
    email = db.Column(db.Text)
    senha = db.Column(db.Text)
    estoques_pessoa = db.relationship('Estoque', secondary=estoque_pessoa, backref='gerenciador')

    def __str__(self):
        return f'{self.nome} [id={str(self.id)}], ' +\
               f'{self.email}'

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "senha": self.senha,
            "estoques_pessoa": self.estoques_pessoa
        }