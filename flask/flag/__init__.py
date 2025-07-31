import os
from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException

def create_app():
    app = Flask(__name__)

    from .views import main_views
    app.register_blueprint(main_views.bp)

    @app.errorhandler(Exception)
    def handle_exception(e):
        if isinstance(e, HTTPException):
            return jsonify(error=str(e)), e.code
        return jsonify(error=str(e)), 500

    return app