/**
 * Convince sample data to conform to a DB schema.
 */

const fs = require('fs');

const masseuse = async function() {
    let plantObjects;
    try {
        const dataString = fs.readFileSync('plants.json', 'utf-8');
        plantObjects = JSON.parse(dataString);
    } catch (err) {
        console.error(err);
    }

    for (plant of plantObjects) {
        console.log(plant.name, plant.image);
    }
}

masseuse();
