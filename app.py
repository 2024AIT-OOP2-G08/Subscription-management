from flask import Flask, render_template
from models import initialize_database
from models import Contents
from routes import blueprints
from playhouse.shortcuts import model_to_dict
app = Flask(__name__)

initialize_database()

for blueprint in blueprints:
    app.register_blueprint(blueprint)

@app.route('/')
def index():
    # ここでバックのデータ処理
    # データベースからContentsクラス(サブスクのデータ)を取得  
    contents = Contents.select()
    # contentsを辞書型に変換し、リストに格納
    contents_dict = [model_to_dict(content) for content in contents]
    # 金額が安い順にソートする
    # reverse=Trueで値段が高い順、Falseで安い順にソート
    contents_dict.sort(key=lambda x: x['price'], reverse=False)
    # print(contents_dict)
    # index.htmlにcontents_dicとして渡す
    return render_template('index.html', contents_dict=contents_dict)
    
if __name__ == '__main__':
    app.run(port=8080, debug=True)