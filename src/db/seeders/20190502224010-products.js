

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('product', [
    {
      product_id: 1,
      name: 'First Product',
      description: 'New Populated products in seeded database',
      price: 700.00,
      discounted_price: 650.00,
    },
    {
      product_id: 2,
      name: 'Second Product',
      description: 'New Populated Second products in seeded database',
      price: 800.00,
      discounted_price: 750.00,
    },
    {
      product_id: 3,
      name: 'Third Product',
      description: 'New Populated Third products in seeded database',
      price: 500.00,
      discounted_price: 350.00,
    },
    {
      product_id: 4,
      name: 'Fourth Product',
      description: 'New Populated Fourth products in seeded database',
      price: 100.00,
      discounted_price: 70.00,
    },
    {
      product_id: 5,
      name: 'Fifth Product',
      description: 'New Populated Fifth products in seeded database',
      price: 600.00,
      discounted_price: 400.00,
    },
    {
      product_id: 6,
      name: 'Sixth Product',
      description: 'New Populated Sixth products in seeded database',
      price: 100.00,
      discounted_price: 90.00,
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('product', null, {})
};
