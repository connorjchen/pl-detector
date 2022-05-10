from flask import Flask, render_template, request
import json
import model


app = Flask(__name__)

@app.route("/")
def temp():
    print("some request")
    return "temp", 404

@app.route("/cds-datathon/")
def scuffed_editor():
    return render_template("main.html"), 404


@app.route("/cds-datathon/api/backend/predictlang/", methods=["POST"])
def process_info():
    """
    Predicts language of a given text file

    JSON file should be in the form {contents: "..."}
    """
    # print(request.data)
    body = json.loads(request.data)
    contents = body.get("contents")
    predictedlanguage = json.dumps({"predict-lang": str(len(contents))})
    predicted_dict = model.predict_lang(contents)
    print(predicted_dict)

    return predicted_dict, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
