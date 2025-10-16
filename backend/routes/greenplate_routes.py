from flask import Blueprint, request, jsonify
from services.openai_service import analizza_piatto

greenplate_bp = Blueprint("greenplate_bp", __name__)

@greenplate_bp.route("/api/analizza", methods=["POST"])
def analizza():
    data = request.json
    piatto = data.get("piatto", "").strip()

    if not piatto:
        return jsonify({"error": "Inserisci il nome del piatto"}), 400

    try:
        result_json = analizza_piatto(piatto)
        return jsonify({"result": result_json})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
