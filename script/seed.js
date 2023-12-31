'use strict'

const {db, models: {User, Products, Cart, Sales} } = require('../server/db')
const masseuse = require('./masseuse');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Create Users
  const users = await Promise.all([
    User.create({ 
      firstName: 'Cody',
      lastName: 'McCodington',
      email: 'cody@cody.org',
      userName: 'cody', 
      password: 'abc123' 
    }),
    User.create({ 
      firstName: 'Murphy',
      lastName: 'mcMurphington',
      email: 'murphy@murphacheussetsinstituteoftechnology.edu',
      userName: 'murphy', 
      password: 'abc123' 
    }),
    User.create({ 
      firstName: 'Steve',
      lastName: 'Stevenson',
      email: 'steve@aol.com',
      userName: 'steve', 
      password: 'abc123',
      role: 'admin'
    })
  ]);
  console.log(`seeded ${users.length} users`);

  // Create Products
  const products = await masseuse();
  for (const product of products) {
    await Products.create({
      productName: product.name,
      productImg: product.image,
      description: product.description,
      quantity: product.quantity,
      price: product.price
    });
  }
  console.log(`seeded ${products.length} products`);

  // Create some cart entries
  const cody = users[0];

  const codysCart = await Promise.all([
    Cart.create({items: 1, quantity: 2, userId: cody.id}),
    Cart.create({items: 45, quantity: 1, userId: cody.id}),
    Cart.create({items: 100, quantity: 1, userId: cody.id})
  ]);
  console.log(`Created a cart with ${codysCart.length} items for Cody`);

  const codysHistory = await Promise.all([
    Sales.create({items: 1, quantities: 2, date: new Date('2023-07-18'), userId: cody.id}),
    Sales.create({items: 45, quantities: 1, date: new Date('2023-07-18'), userId: cody.id}),
    Sales.create({items: 100, quantities: 1, date: new Date('2023-07-18'), userId: cody.id})
  ]);
  console.log(`Created records in sales for ${codysHistory.length} items`)

  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}


/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
