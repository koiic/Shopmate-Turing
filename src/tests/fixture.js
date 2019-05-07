export default {
  newproduct: {
    product_id: 1,
    name: 'Second Product',
    description: 'New Populated Second products in seeded database',
    price: 800.00,
    discounted_price: 750.00,
  },

  newcategory: {
    category_id: 1,
    department_id: 1,
    name: 'French',
    description: 'the italian matchers'
  },

  newdepartment: {
    department_id: 1,
    name: 'Regional',
    description: 'no description'
  },

  newproductcategory: {
    product_id: 1,
    category_id: 1,
  },

  validuser: {
    email: 'goke@gmail.com',
    name: 'tester',
    password: 'gohkman'
  },

  invaliduser: {
    email: '',
    name: 'testuser',
    password: 'fishcalory'
  },

  invalidpassword: {
    email: 'gokegara@gmail.com',
    name: 'testuser',
    password: ''
  },

  uncompleteuserdata: {
    name: 'testing',
    password: 'Password'
  }


};
