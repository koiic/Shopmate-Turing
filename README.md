


#               Build Status
[![Build Status](https://travis-ci.com/koiic/Shopmate-Turing.svg?token=Q32jG2NqTmqEXpyGpEP1&branch=master)](https://travis-ci.com/koiic/Shopmate-Turing)

#                   SHOPMATE
---
###### `A full nodejs shopping API with the customers in mind.`

 #                  Getting Started
 ***


##           To get started follow this simple step

##### N:B be sure you have NodeJs installed, If not  follow this link to [Install NODE](https://nodejs.org/en/download/)

1. ##### clone or download project
2. ##### cd(change directory) into the root project directory
3. ##### Run `npm install` or `yarn install` on your bash/terminal to install dependencies
4. ##### Run this command to auto generate a .env file  `npm run setup` or `yarn run setup` if you are using yarn
5. ##### configure your .env to your personal requirement
6. ##### start the application

##       Development

```
`npm run dev` or `yarn run dev`
```
##        Test
```
`npm run test` or `yarn run test`
```

##        Production
```
npm start
```
##         Route
>**base url** = `api/v1`


>**product url** =`/products`

| Http-Method   | Url           |
| ------------- |:-----------------:|
| GET           |     /             |
| GET           |   **/search**     |
| GET           | **/:product_id**  |
| GET           | **/inCategory/:product_id**|
| GET           | **/inDepartment/:product_id**|


>**customer url** =`/customers`

| Http-Method   | Url           |
| ------------- |:-----------------:|
| POST          |    /              |
| POST          |   **/login**      |
| PATCH         |   **/address**    |

>**social login url**

| Http-Method   | Url           |
| ------------- |:-----------------:|
| GET           |   **/auth/google**|


>**order url** =`/orders`

| Http-Method   | Url               |
| ------------- |:-----------------:|
| POST          |    /              |
| GET           |   **/shortDetails/:order_id** |


>**stripe url** =`/stripe`

| Http-Method   | Url           |
| ------------- |:-----------------:|
| POST          |    **/charge      |
| POST          |   **/token        |


>**category url** =`/categories`

| Http-Method   | Url           |
| ------------- |:-----------------:|
| GET           |    /              |
| GET           |   **/:category_id** |

>**department url** =`/departments`

| Http-Method   | Url           |
| ------------- |:-----------------:|
| GET           |    /              |
| GET           |   **/:department_id** |

>**shoppingcart url** =`/shoppingcart`

| Http-Method   | Url           |
| ------------- |:-----------------:|
| GET           |    **/generatecartid** |
| POST          |   **/add**        |
| GET           |   **/:cart_id*    |
| DELETE        |   **/empty/:cart_id**|

>**tax url** =`/tax`

| Http-Method   | Url           |
| ------------- |:-----------------:|
| GET           |    /              |
| GET           |   **/:tax_id**    |


##   API DOCUMENTATION

The Api endpoints used for this application can be found in the app documentation through the following link: [postman documentation](https://documenter.getpostman.com/view/2451357/S1LyT7Qw)



##          Technology Used (Built With)
___
* ##### [NodeJs](https://nodejs.org/en/download/)  - is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* ##### [Express](https://expressjs.com/) - is a minimal and flexible Node.js web application
* ##### [sequelize](http://docs.sequelizejs.com/) -  Sequelize ORM documentation.



##              Style Guide
 ##### This is the link to the style guide use to build this API [Javascript Airbnb](https://github.com/airbnb/javascript)


##              Production URL

##### The API is [Hosted Here](https://shopmate-turing-api.herokuapp.com/)

##  Authors
##### `Ismail Ibrahim K`

##  License
##### This project is licensed under the MIT License

## Acknowledgement
* ##### [Google](https://github.com/airbnb/javascript)
* ##### [github](https://guides.github.com/features/mastering-markdown/)
* ##### [stack-overflow](https://stackoverflow.com/)



