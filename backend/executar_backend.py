from config import *
from modelo.pessoa import *
from rotas import *

with app.app_context():
    @app.route("/")
    def inicio():
        return 'MyStock'

    app.run(debug=True, host="0.0.0.0")