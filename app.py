from flask import Flask, render_template
from models import initialize_datebase 

from routes import blueprints

app = Flask(__name__)

initialize_datebase()

for blueprint in blueprints:
    app.register_blueprint(blueprint)

@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(port=8080, debug=True)