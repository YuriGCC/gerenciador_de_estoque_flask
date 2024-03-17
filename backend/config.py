from flask import Flask, jsonify, request,json
from flask_sqlalchemy import SQLAlchemy
import os

from flask_cors import CORS
app = Flask(__name__)
CORS(app)  

path = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(path, 'mystock.db')

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+arquivobd
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  
db = SQLAlchemy(app)

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from datetime import timedelta

app.config["JWT_SECRET_KEY"] = "e8053af8f5dbc9564f3fea63e8798467f6754b18cbab3205ec9316ef46e0e22d"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=180)
jwt = JWTManager(app)

