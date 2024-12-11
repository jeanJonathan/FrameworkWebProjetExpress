const fs = require('fs'); 
const path = require('path');

// Chemin vers cities.json
const CITIES_FILE = path.join(__dirname, '../data/cities.json');


const CITIES_LOCATIONS_FILE = path.join(__dirname, '../data/cities_locations.json');

// ---------------------------------------------
// Fonctions pour cities.json
// ---------------------------------------------

// On vérifie si le fichier cities.json existe
const fileExists = () => fs.existsSync(CITIES_FILE);

// Lecture des données du fichier cities.json
const readData = () => {
    if (!fileExists()) {
        console.log('Fichier cities.json introuvable.');
        return [];
    }

    const data = fs.readFileSync(CITIES_FILE, 'utf8');
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lecture des données :', error);
        return [];
    }
};

// Écriture des données dans cities.json
const writeData = (data) => {
    fs.writeFileSync(CITIES_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// Recherche une ville par ID dans cities.json
const findCityById = (id) => {
    const cities = readData();
    return cities.find(city => city.id === id);
};

// On vérifie si une ville existe déjà par son nom (dans cities.json)
const cityExistsByName = (name) => {
    const cities = readData();
    return cities.some(city => city.name.toLowerCase() === name.toLowerCase());
};

// ---------------------------------------------
// Fonctions pour cities_locations.json
// ---------------------------------------------


const fileExistsLocations = () => fs.existsSync(CITIES_LOCATIONS_FILE);

const readLocations = () => {
    if (!fileExistsLocations()) {
        console.log('Fichier cities_locations introuvable.');
        return [];
    }

    const data = fs.readFileSync(CITIES_LOCATIONS_FILE, 'utf8');
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lecture des data locations :', error);
        return [];
    }
};

const writeLocations = (data) => {
    fs.writeFileSync(CITIES_LOCATIONS_FILE, JSON.stringify(data, null, 2), 'utf8');
};

const findLocationById = (id) => {
    const cities = readLocations();
    return cities.find(city => city.id === id);
};

const locationExistsByName = (name) => {
    const cities = readLocations();
    return cities.some(city => city.name.toLowerCase() === name.toLowerCase());
};

module.exports = {
    fileExists,
    readData,
    writeData,
    findCityById,
    cityExistsByName,
    fileExistsLocations,
    readLocations,
    writeLocations,
    findLocationById,
    locationExistsByName,
};
