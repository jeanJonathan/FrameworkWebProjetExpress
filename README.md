# Framework Web - Projet

## **1. Objectifs du Projet**

- Apprendre à utiliser **Express.js** pour créer un serveur web.
- Gérer les données dynamiques avec un fichier JSON.
- Mettre en œuvre un moteur de templates dynamique (**Pug**).
- Implémenter les actions CRUD (**Create**, **Read**, **Update**, **Delete**) pour gérer les villes.
- Structurer correctement un projet web avec une arborescence bien définie.
- Fournir une API REST simple pour les villes.
- Intégrer une carte interactive avec **Leaflet** pour afficher les villes géolocalisées.

## **2. Description**
Ce projet est une appli web Express permettant de gérer une liste de villes (afficher, ajouter, modifier, supprimer) et d’afficher une carte où des villes, filtrées à partir d’un gros volume de data, sont positionnées avec des marqueurs.

## **3. Fonctionnalités principales**
- Afficher une liste de villes avec leur ID et leur nom.
- Modifier le nom d’une ville depuis un formulaire.
- Supprimer une ville de la liste.
- Ajouter une nouvelle ville.
- Afficher une carte (avec Leaflet) présentant des villes géolocalisées ici que Nouvelle-Aquitaine.

## **4. Structure du projet**

```
Framework Web - Projet/
├── api/
│   ├── cities.js              # Routes API pour gérer les villes (CRUD)
│   ├── validation.js          # Validation des requêtes API
│   ├── cities_locations.js    # Routes API pour gérer les villes avec coordonnées
│
├── data/
│   ├── cities.json            # Liste des villes (nom + id)
│   ├── cities_locations.json  # Données filtrées avec lat/lng
│   ├── convert.js             # Script pour filtrer et convertir un CSV en JSON
│
├── public/
│   ├── css/
│   │   └── styles.css         # Feuille de style principale
│   ├── images/
│   │   └── logo.png           # Logo du projet
│   ├── js/
│       └── main.js            # Scripts côté client
│
├── utils/
│   ├── data_utils.js          # Fonctions pour lire/écrire les données JSON
│   ├── request_utils.js       # Fonctions utilitaires pour les requêtes
│
├── views/
│   ├── error.pug              # Vue pour les erreurs 404
│   ├── index.pug              # Vue d'accueil 
│   ├── layout.pug             # Template p commun à toutes les vues
│   ├── list.pug               # Vue pour afficher/modifier/supprimer les villes
│   └── map.pug                # Vue pour afficher la carte
│
├── server.js                  # Point d'entrée du serveur Express
├── package.json               # Dépendances et scripts npm
└── README.md                  # Documentation 
```

## **5. Prérequis**
- 

## **6. Installation**
### Cloner le dépôt :
```bash
git clone 

```
### Installer les dépendances :
```bash
npm install
```
### Démarrer le serveur :
```bash
node server.js
ou npm start 
```
### Ouvrir le navigateur à l’adresse :
```arduino
http://localhost:3005
```

## **7. Ma Démarche pour realiser ce projet**

### Étape 1 : Configuration du projet
J’ai commencé par créer la structure des dossiers, puis ajouté les dépendances nécessaires :

- Express pour les routes
- Pug pour le moteur de templates
- Body-parser (intégré dans Express) pour traiter les requêtes POST
- Method-override pour gérer PUT/DELETE depuis des formulaires HTML
- UUID pour générer des IDs uniques
- Leaflet via CDN pour la carte

```bash
npm install express pug method-override uuid
```

### Étape 2 : Lecture et gestion des données
J’ai créé `utils/data_utils.js` pour :

- Lire et écrire dans `cities.json`.
- Vérifier si le fichier existe, créer le fichier `cities_locations.json` filtré à partir du CSV venant de la source https://simplemaps.com/data/world-cities, afin de ne conserver qu’un sous-ensemble de villes exp celles de la Nouvelle-Aquitaine.

### Étape 3 : Routes et API
J’ai mis en place deux types de routes :

- **Dans `api/cities.js` :**
  - `GET /api/cities`
  - `POST /api/city`
  - `PUT /api/city/:id`
  - `DELETE /api/city/:id`

- **Dans `api/cities_locations.js` :**
  - `GET /api/cities-locations` pour charger les villes géolocalisées

### Étape 4 : Vues avec Pug
J’ai utilisé Pug pour générer des pages :

- `layout.pug` pour le cadre général (header, menu, footer)
- `index.pug` et `list.pug` pour afficher et gérer les villes
- `map.pug` pour la carte, récupérant les données avec `fetch('/api/cities-locations')`

### Étape 5 : Styles
J’ai ajouté `public/css/styles.css` pour donner un aspect top aux différentes pages

### Étape 6 : Tests
J’ai testé chaque route (`GET`, `POST`, `PUT`, `DELETE`) avec Postman et vérifié l’affichage de la carte et des marqueurs.

## **8. API**

### Endpoints principaux :
- `GET /api/cities` : Liste des villes
- `POST /api/city` : Ajout d’une ville `{ "name": "..." }`
- `PUT /api/city/:id` : Modification du nom d’une ville `{ "name": "..." }`
- `DELETE /api/city/:id` : Suppression d’une ville
- `GET /api/cities-locations` : Liste des villes géolocalisées filtrées

## **9. Auteur**
Jean-Jonathan KOFFI
