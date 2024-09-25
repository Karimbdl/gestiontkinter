from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

# Dictionnaire pour stocker les incidents
incidents = {}

# Route pour afficher la page principale
@app.route('/')
def index():
    return render_template('index.html')

# Route pour signaler un incident
@app.route('/signaler', methods=['POST'])
def signaler_incident():
    data = request.json
    salle = data.get('salle')
    nom = data.get('nom')
    prenom = data.get('prenom')
    date_naissance = data.get('date_naissance')
    categorie = data.get('categorie')
    importance = data.get('importance')

    if not salle or not nom or not prenom or not date_naissance or not categorie:
        return jsonify({"error": "Tous les champs doivent être remplis."}), 400

    # Enregistrer l'incident avec la date et l'heure actuelles
    timestamp = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    incidents[salle] = {
        "nom": nom,
        "prenom": prenom,
        "date_naissance": date_naissance,
        "categorie": categorie,
        "importance": importance,
        "timestamp": timestamp
    }

    return jsonify({"message": "Incident signalé avec succès", "importance": importance})

# Route pour obtenir la liste des incidents
@app.route('/incidents', methods=['GET'])
def get_incidents():
    return jsonify(incidents)

if __name__ == '__main__':
    app.run(debug=True)