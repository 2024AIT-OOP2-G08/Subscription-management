from flask import Blueprint, render_template, request, redirect, url_for
from models import Contents

content_bp = Blueprint('content', __name__, url_prefix='/content')

@content_bp.route('/')
def content():

    return render_template('content.html')