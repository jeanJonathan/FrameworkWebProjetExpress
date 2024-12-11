const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const {
  fileExistsLocations,
  readLocations,
  writeLocations,
  findLocationById,
  locationExistsByName
} = require('../utils/data_utils');

// GET /api/cities-locations
// Retourne toutes les villes avec coordonnées
router.get('/cities-locations', (req, res) => {
  if (!fileExistsLocations()) {
    return res.status(404).json({ error: 'Le fichier cities_locations.json est introuvable.' });
  }
  const cities = readLocations();
  res.json(cities);
});

// POST /api/city-location
// Pour ajouter une nouvelle ville avec nom, lat et lng
router.post('/city-location', (req, res) => {
  let { name, lat, lng } = req.body;

  if (!name || !lat || !lng) {
    return res.status(400).json({ error: 'Veuillez fournir un nom, une latitude et une longitude.' });
  }

  // Pour convertir lat/lng en number si nécessaire
  lat = parseFloat(lat);
  lng = parseFloat(lng);

  // Si le fichier n'existe pas, on le crée avec un tableau vide
  let cities = [];
  if (!fileExistsLocations()) {
    writeLocations([]);
  } else {
    cities = readLocations();
  }

  // On vérifie si la ville existe déjà
  if (locationExistsByName(name)) {
    return res.status(500).json({ error: 'Cette ville existe déjà.' });
  }

  const newCity = {
    id: uuidv4(),
    name,
    lat,
    lng
  };

  cities.push(newCity);
  writeLocations(cities);

  res.status(201).json({ message: 'Ville ajoutée avec succès.', city: newCity });
});

// PUT /api/city-location/:id
// Pour mettre à jour une ville existante (nom, lat, lng si fournis)
router.put('/city-location/:id', (req, res) => {
  const { id } = req.params;
  const { name, lat, lng } = req.body;

  let cities = readLocations();

  const cityIndex = cities.findIndex(city => city.id === id);
  if (cityIndex === -1) {
    return res.status(404).json({ error: 'Ville introuvable.' });
  }

  // Mettre à jour uniquement les champs fournis
  if (name) {
    // On vérifie si une autre ville n'a pas déjà ce nom
    const cityWithSameName = cities.find(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== id);
    if (cityWithSameName) {
      return res.status(500).json({ error: 'Une autre ville porte déjà ce nom.' });
    }
    cities[cityIndex].name = name;
  }

  if (lat) {
    cities[cityIndex].lat = parseFloat(lat);
  }

  if (lng) {
    cities[cityIndex].lng = parseFloat(lng);
  }

  writeLocations(cities);

  res.json({ message: 'Ville mise à jour avec succès.', city: cities[cityIndex] });
});

// DELETE /api/city-location/:id
// On supprime la ville correspondant à l'ID
router.delete('/city-location/:id', (req, res) => {
  const { id } = req.params;
  let cities = readLocations();

  const cityIndex = cities.findIndex(city => city.id === id);
  if (cityIndex === -1) {
    return res.status(404).json({ error: 'Ville introuvable.' });
  }

  const deletedCity = cities.splice(cityIndex, 1)[0];
  writeLocations(cities);

  res.json({ message: 'Ville supprimée avec succès.', city: deletedCity });
});

module.exports = router;
