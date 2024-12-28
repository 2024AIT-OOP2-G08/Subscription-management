from flask import Blueprint, render_template, request, redirect, url_for
from models import Contents
from peewee import DoesNotExist

delete_bp = Blueprint('delete', __name__, url_prefix='/delete')

@delete_bp.route('/<int:id>', methods=['GET', 'POST'])
def delete(id):
    try:
        # 指定された ID のデータを取得
        content = Contents.get(Contents.id == id)
    except DoesNotExist:
        # データが存在しない場合はホームにリダイレクト
        return redirect(url_for('index'))

    if request.method == 'POST':
        # 削除処理
        content.delete_instance()
        return redirect(url_for('index'))  # 削除後にホーム画面にリダイレクト

    # GET メソッドの場合、削除確認ページを表示
    return render_template('delete.html', content=content)