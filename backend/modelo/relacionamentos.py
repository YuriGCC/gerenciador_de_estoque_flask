from config import *

estoque_pessoa = db.Table('estoque_pessoa', db.Column('pessoa_id',db.Integer, db.ForeignKey('pessoa.id')),
                              db.Column('estoque_id',db.Integer, db.ForeignKey('estoque.id')))