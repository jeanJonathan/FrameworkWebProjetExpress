const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const citiesRoutes = require('./api/cities');
const citiesLocationsRoutes = require('./api/cities_locations'); // ce new routeur pour les villes avec coordonnées

const app = express();
const port = 3006;

// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // Pour utiliser PUT DELETE via ?_method=PUT/DELETE

// Configuration de Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes API
app.use('/api', citiesRoutes);
app.use('/api', citiesLocationsRoutes); // On intègration les routes pour cities_locations

// Page d'accueil
app.get('/', (req, res) => {
    const { readData } = require('./utils/data_utils');
    const cities = readData();
    res.render('index', {
        title: 'Liste des villes',
        cities,
        activePage: 'home' // Page active = 'home'
    });
});

// Page list
app.get('/list', (req, res) => {
    const { readData } = require('./utils/data_utils');
    const cities = readData();
    res.render('list', {
        title: 'Liste des villes',
        cities,
        activePage: 'list' // Page active = 'list' pour le css
    });
});

// Page map
app.get('/map', (req, res) => {
    // à partir de /api/cities-locations on charge la carte
    res.render('map', {
        title: 'Carte',
        activePage: 'map' // Page active = 'map'
    });
});

// Gestion de erreur 404
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Erreur 404',
        message: 'Page non trouvée.'
    });
});

app.listen(port, () => {
    console.log(`Démarré sur http://localhost:${port}`);
});
