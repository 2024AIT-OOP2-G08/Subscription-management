from flask import Blueprint, render_template, request, redirect, url_for
from models import Contents

edit_bp = Blueprint('edit', __name__, url_prefix='/edit')

@edit_bp.route('/')
def edit():
    return render_template('edit.html')