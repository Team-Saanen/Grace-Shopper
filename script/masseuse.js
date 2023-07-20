/**
 * Convince sample data to conform to a DB schema.
 */

const fs = require('fs');

const masseuse = async function() {
    let plantObjects;
    try {
        // This path assumes masseuse is being called via npm run seed.
        const dataString = fs.readFileSync('./script/plants.json', 'utf-8');
        plantObjects = JSON.parse(dataString);
    } catch (err) {
        console.error(err);
    }

    // for (plant of plantObjects) {
    //     console.log(plant);
    // }
    return plantObjects;
}

module.exports = masseuse;
