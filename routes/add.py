from flask import Blueprint, render_template, request, redirect, url_for
from models import Contents

add_bp = Blueprint('add', __name__, url_prefix='/add')

#データ追加ページの処理を追加
#はやて


@add_bp.route('/', methods=['GET', 'POST'])
def add():

    #POSTメソッドでリクエストがあった場合の処理
    # ヒント if request.method == 'POST':


    
    #入力するだけなのでテンプレートに送らない
    return render_template('add.html')