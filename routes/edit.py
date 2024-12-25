from flask import Blueprint, render_template, request, redirect, url_for
from models import Contents
from datetime import date

edit_bp = Blueprint('edit', __name__, url_prefix='/edit')

@edit_bp.route('edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    content = Contents.get(Contents.id == id)
    if not content:
        return redirect(url_for('index'))
    #POSTメソッドでリクエストがあった場合の処理
    if request.method == 'POST':
        content.name = request.form['name']
        content.price = int(request.form['price'])
        content.entry = date.fromisoformat(request.form['entry'])
        content.payment_date = date.fromisoformat(request.form['payment_date'])
        content.save()
        return redirect(url_for('index'))

    #編集するデータをテンプレートに送る
    return render_template('edit.html', content=content)