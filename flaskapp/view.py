import os
from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from werkzeug import secure_filename, SharedDataMiddleware

import id3reader


APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static/tmp')
ALLOWED_EXTENSIONS = set(['mp3'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

app.add_url_rule('/uploads/<filename>', 'uploaded_file',
                 build_only=True)
app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
    '/uploads': app.config['UPLOAD_FOLDER']
})

app.debug = True


@app.route('/', methods=["GET", "POST"])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('results_page', filename=filename))
    return render_template('start.html')


@app.route('/results', methods=['GET', 'POST'])
def results_page():
    filename = request.args['filename']
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    id3r = id3reader.Reader(filepath)
    song_title = id3r.getValue('title')
    artist_name = id3r.getValue('artist')
    return render_template('results.html', song_title=song_title,
                           artist_name=artist_name)


# def delete_item(item_id):
#     new_id = item_id
#     item = self.session.query(Item).get(item_id)
#     os.remove(os.path.join(app.config['UPLOADED_ITEMS_DEST'], item.filename))
#     self.session.delete(item)
#     db.session.commit()
#     return redirect(url_for('admin_items'))


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run()
