from flask import Flask
from flask_cors import CORS
from routes.greenplate_routes import greenplate_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(greenplate_bp)

if __name__ == "__main__":
    app.run(debug=True)