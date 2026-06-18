import os

from flask import Flask, send_from_directory

app = Flask(__name__, static_folder=".")

PORT = int(os.environ.get("PORT", 5000))


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
