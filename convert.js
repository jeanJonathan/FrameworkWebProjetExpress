const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFilePath = path.join(__dirname, 'data', 'cities.csv');
const outputFilePath = path.join(__dirname, 'data', 'cities_locations.json');

const results = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (data) => {
    results.push(data);
  })
  .on('end', () => {
    // Filtrer les données pour ne garder que :
    // - Les villes dont le "country" est "France"
    // - Les villes dont "admin_name" est "Nouvelle-Aquitaine"
    const filteredData = results.filter(city => 
      city.country === 'France' && city.admin_name === 'Nouvelle-Aquitaine'
    );

    // On ecrire le fichier filtré
    fs.writeFileSync(outputFilePath, JSON.stringify(filteredData, null, 2), 'utf-8');
    console.log('Conversion ok.');
  });
