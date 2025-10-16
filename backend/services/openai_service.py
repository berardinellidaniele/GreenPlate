import json
from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def analizza_piatto(nome_piatto):
    prompt = f"""
    L'utente ti fornisce il nome di un piatto: "{nome_piatto}".
    Analizzalo e restituisci SOLO un JSON (senza testo aggiuntivo, senza markdown) con i seguenti campi (per 100 grammi di porzione):

    {{
      "piatto": "string",
      "ingredienti_principali": ["string", ...],
      "co2_kg_l": numero,
      "acqua_l": numero,
      "alternativa_sostenibile": "string",
      "valore_nutrizionale": "string",
      "spiegazione": "string"
      "calorie": numero
    }}

    - "co2_kg_l" = stima kg CO₂ per porzione
    - "acqua_l" = stima litri d'acqua per porzione
    - "valore_nutrizionale" = breve sintesi
    - "spiegazione" = massimo 2 frasi, tono motivante e semplice

    Se l'utente mette qualcosa che non è un piatto o che non capisci ritorna un json solo con un errore nel campo "error"
    """

    response = client.responses.create(
        model="gpt-4o-mini",
        input=prompt
    )

    output_text = response.output_text

    try:
        return json.loads(output_text)
    except json.JSONDecodeError:
        raise ValueError(f"Risposta non valida dal modello:\n{output_text}")
