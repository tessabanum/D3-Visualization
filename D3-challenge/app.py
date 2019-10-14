from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='/assets')


@app.route('/')
def index_path():
    return send_from_directory('templates', 'index.html')


if __name__ == '__main__':
    app.run()
