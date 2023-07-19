/**
 * An (ideally) fire-an-forget script to generate seed data for our DB.
 * 
 * Plant info retrieved from perenual.com: https://perenual.com/docs/api
 * Use of API requires a key.
 */
const axios = require('axios');
const fs = require('fs');

const KEY = process.env.CURRKEY;

const seedFetch = async function() {
    const processedPlants = [];
    for (page of [1, 100, 200, 250, 300]) {
        const resp = await axios.get(`https://perenual.com/api/species-list?page=${page}&key=${KEY}`);

        for (plant of resp.data.data) {
            const processedPlant = {
                name: plant.common_name,
                image: (plant.default_image ? plant.default_image.small_url : null),
                description: `${plant.cycle} that requires ${plant.watering} watering.`,
                quantity: 100,
                price: Math.round(Math.random() * 100) + .95
            }
            processedPlants.push(processedPlant);
        }
    }

    fs.writeFile('plants.json', JSON.stringify(processedPlants), err => {
        if (err) {
            console.error(err);
        }
    });
}

seedFetch();