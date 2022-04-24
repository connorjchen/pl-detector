from flask import Flask, render_template, request
import json


app = Flask(__name__)


@app.route("/")
def scuffed_editor():
    return render_template("main.html"), 404


@app.route("/api/backend/predictlang/", methods=["POST"])
def process_info():
    """
    Predicts language of a given text file

    JSON file should be in the form {contents: "..."}
    """
    # print(request.data)
    body = json.loads(request.data)
    contents = body.get("contents")
    predictedlanguage = json.dumps({"predict-lang": contents})

    return predictedlanguage, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
