const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Générer des IDs uniques
const { readData, writeData, cityExistsByName } = require('../utils/data_utils'); // Utilitaires pour manipuler les datas
const { validateRequestCreateCity, validateRequestUpdateCity, validateRequestDeleteCity } = require('../utils/request_utils'); // Validation des requêtes

const router = express.Router();

// Route GET : Récupérer toutes les villes
router.get('/cities', (req, res) => {
    const cities = readData(); // On lire les villes depuis cities.json
    res.status(200).json(cities);
});

// Route POST : Pour ajouter une nouvelle ville
router.post('/city', (req, res) => {
    if (!validateRequestCreateCity(req, res)) {
        return; // Validation a échoué, rep d'erreur envoyée ensuite
    }

    const cityName = req.body.name;

    if (cityExistsByName(cityName)) {
        return res.status(400).json({ error: 'La ville existe déjà.' });
    }

    const newCity = { id: uuidv4(), name: cityName };
    const cities = readData();
    cities.push(newCity);
    writeData(cities);

    res.status(201).json(newCity);
});

// Route PUT : Pour mettre à jour une ville par ID
router.put('/city/:id', (req, res) => {
    console.log('PUT request received');
    console.log('ID:', req.params.id);
    console.log('New name:', req.body.name);

    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        console.error('New name is missing');
        return res.status(400).json({ error: 'Le nouveau nom est requis.' });
    }


    const cities = readData();
    const cityIndex = cities.findIndex(city => city.id === id);

    if (cityIndex === -1) {
        console.error('City not found');
        return res.status(404).json({ error: 'Ville introuvable.' });
    }

    cities[cityIndex].name = name;
    writeData(cities);
    console.log('City updated successfully:', cities[cityIndex]);

    res.redirect('/');
});

// Route DELETE : Pour supprimer une ville par ID
router.delete('/city/:id', (req, res) => {
    if (!validateRequestDeleteCity(req, res)) {
        return; 
    }

    const cityId = req.params.id;

    const cities = readData();
    const updatedCities = cities.filter((city) => city.id !== cityId);

    if (cities.length === updatedCities.length) {
        return res.status(404).json({ error: 'Ville introuvable.' });
    }

    writeData(updatedCities);
    res.status(200).json({ message: 'Ville supprimée avec succès.' });
});

module.exports = router;
