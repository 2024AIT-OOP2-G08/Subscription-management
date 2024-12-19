from flask import Blueprint, render_template, request, redirect, url_for
from models import Contents
from datetime import date

add_bp = Blueprint('add', __name__, url_prefix='/add')

#データ追加ページの処理を追加
@add_bp.route('/', methods=['GET', 'POST'])
def add():
    #POSTメソッドでリクエストがあった場合の処理
    if request.method == 'POST':
        created_at = date.today()
        name = request.form['name']
        price = int(request.form['price'])
        entry = date.fromisoformat(request.form['entry'])
        payment_date = date.fromisoformat(request.form['payment_date'])
        Contents.create(created_at=created_at, name=name, price=price, entry=entry, payment_date=payment_date)

        return redirect(url_for('index'))

    #入力するだけなのでテンプレートに送らない
    return render_template('add.html')