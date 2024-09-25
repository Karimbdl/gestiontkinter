document.addEventListener("DOMContentLoaded", function() {
    fetchIncidents();
});

function fetchIncidents() {
    fetch('/admin/incidents')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#incidents-table tbody');
            tableBody.innerHTML = '';

            for (const [salle, incident] of Object.entries(data)) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${salle}</td>
                    <td>${incident.nom}</td>
                    <td>${incident.prenom}</td>
                    <td>${incident.categorie}</td>
                    <td>${incident.importance}</td>
                    <td>${incident.timestamp}</td>
                    <td><button onclick="showDetails('${salle}')">Détails</button></td>
                `;
                tableBody.appendChild(row);
            }
        });
}

function showDetails(salle) {
    fetch('/admin/incidents')
        .then(response => response.json())
        .then(data => {
            const incident = data[salle];
            const details = `
                Salle: ${salle}<br>
                Nom: ${incident.nom}<br>
                Prénom: ${incident.prenom}<br>
                Date de naissance: ${incident.date_naissance}<br>
                Catégorie: ${incident.categorie}<br>
                Importance: ${incident.importance}<br>
                Heure: ${incident.timestamp}<br>
            `;
            document.getElementById('details').innerHTML = details;
            document.getElementById('incident-details').style.display = "block";
        });
}

function closeIncidentDetails() {
    document.getElementById('incident-details').style.display = "none";
}
