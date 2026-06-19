from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# load data
with open("data.json", "r") as f:
    DATA = json.load(f)


@app.route("/api/date-ideas", methods=["GET"])
def get_date_ideas():

    length = request.args.get("length")
    mood = request.args.get("mood")
    energy = request.args.get("energy")

    if not length or not mood or not energy:
        return jsonify({"error": "Missing parameters"}), 400

    length = int(length)

    results = [
        item for item in DATA
        if item["dating-length"] == length and item["mood"].lower() == mood.lower() and item["energy"].lower() == energy.lower()
    ]

    return jsonify({
        "results": results
    })


if __name__ == "__main__":
    app.run(debug=True)