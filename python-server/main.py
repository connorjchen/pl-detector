from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def scuffed_editor():
    return render_template("main.html")


# @app.route("/api/backend/")
# def scuffed_editor():
#     return render_template("main.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
