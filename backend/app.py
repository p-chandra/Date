from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open("data.json", "r") as f:
    DATA = json.load(f)


@app.route("/api/date-ideas", methods=["POST"])
def get_date_ideas():

    data = request.get_json()

    length = data.get("length")
    mood = data.get("mood")
    energy = data.get("energy")

    if not length or not mood or not energy:
        return jsonify({"error": "Missing parameters"}), 400

    results = [
        item for item in DATA
        if item["dating-length"] == length
        and item["mood"].lower() == mood.lower()
        and item["energy"].lower() == energy.lower()
    ]

    return jsonify({"results": results})


if __name__ == "__main__":
    app.run(debug=True)