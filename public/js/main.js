// Suppression d'une ville via une requête DELETE
document.querySelectorAll('form[action*="DELETE"]').forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Pour empêcher le rechargement de la page

        if (confirm('Voulez-vous vraiment supprimer cette ville ?')) {
            fetch(form.action, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        alert(data.message);
                        form.closest('tr').remove(); // On delete la ligne du tableau
                    } else {
                        alert(data.error);
                    }
                })
                .catch((err) => console.error('Erreur lors de la suppression:', err));
        }
    });
});

// Modification d'une ville via une requête PUT
document.querySelectorAll('form[action*="PUT"]').forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const input = form.querySelector('input[name="name"]');
        const newName = input.value.trim();

        if (newName === '') {
            alert('Le nouveau nom de la ville est requis.');
            return;
        }

        fetch(form.action, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.name) {
                    alert('Ville modifiée avec succès !');
                    form.closest('tr').querySelector('td:nth-child(2)').textContent = data.name; // On met à jour le nom
                } else {
                    alert(data.error);
                }
            })
            .catch((err) => console.error('Erreur lors de la modification:', err));
    });
});

// Ajout d'une ville via une requête POST
const addForm = document.querySelector('form[action="/api/city"]');
if (addForm) {
    addForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const input = addForm.querySelector('input[name="name"]');
        const cityName = input.value.trim();

        if (cityName === '') {
            alert('Le nom de la ville est requis.');
            return;
        }

        fetch(addForm.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: cityName }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.name) {
                    alert('Ville ajoutée avec succès !');
                    const tbody = document.querySelector('table tbody');
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>
                            <form action="/api/city/${data.id}?_method=PUT" method="POST" style="display:inline">
                                <input type="text" name="name" placeholder="Modifier le nom" required />
                                <button type="submit">Modifier</button>
                            </form>
                            <form action="/api/city/${data.id}?_method=DELETE" method="POST" style="display:inline">
                                <button type="submit">Supprimer</button>
                            </form>
                        </td>
                    `;
                    tbody.appendChild(newRow); // On ajoute la nouvelle ligne au tableau
                    input.value = ''; // On réinitialise le champ de saisie
                } else {
                    alert(data.error);
                }
            })
            .catch((err) => console.error('Erreur lors de l\'ajout:', err));
    });
}

