function openForm(salle) {
    document.getElementById('incident-form').style.display = "block";
    document.getElementById('salle-title').innerText = salle;
}

function closeForm() {
    document.getElementById('incident-form').style.display = "none";
}

function submitIncident() {
    const salle = document.getElementById('salle-title').innerText;
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const date_naissance = document.getElementById('date_naissance').value;
    const categorie = document.getElementById('categorie').value;
    const importance = document.getElementById('importance').value;

    const incidentData = {
        salle,
        nom,
        prenom,
        date_naissance,
        categorie,
        importance
    };

    fetch('/signaler', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(incidentData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeForm();
        updateSalleColor(salle, data.importance);
    });
}

function updateSalleColor(salle, importance) {
    const salleButtons = document.querySelectorAll('.salle-btn');
    salleButtons.forEach(button => {
        if (button.innerText === salle) {
            if (importance === 'majeur') {
                button.style.backgroundColor = 'red';
            } else if (importance === 'moyen') {
                button.style.backgroundColor = 'orange';
            } else {
                button.style.backgroundColor = 'green';
            }
        }
    });
}
