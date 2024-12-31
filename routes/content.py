from flask import Blueprint, render_template, request, redirect, url_for
from models import Contents

content_bp = Blueprint('content', __name__, url_prefix='/content')

@content_bp.route('/<int:content_id>')
def content(content_id):
    content = Contents.get_or_none(Contents.id == content_id)
    contents = Contents.select()
    return render_template('content.html',content=content, contents=contents)