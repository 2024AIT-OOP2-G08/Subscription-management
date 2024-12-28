from flask import Blueprint, render_template, request, redirect, url_for
from models import Contents
from peewee import DoesNotExist
from datetime import date

edit_bp = Blueprint('edit', __name__, url_prefix='/edit')

@edit_bp.route('/<int:id>', methods=['GET', 'POST'])
def edit(id):
    
    content = Contents.get(Contents.id == id)
    if not content:
        return redirect(url_for('index'))  # データが見つからなかった場合のリダイレクト

    if request.method == 'POST':
        content.name = request.form['name']
        content.price = int(request.form['price'])
        content.entry = date.fromisoformat(request.form['entry'])
        content.payment_date = date.fromisoformat(request.form['payment_date'])
        content.save()
        return redirect(url_for('index'))  # 保存後のリダイレクト

    return render_template('edit.html', content=content)