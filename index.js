const express = require('express');

// create an instance of express
const app = express();

const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'

app.listen(port, ()=> {
  console.log(`server listening to port http://${host}:${port}`);
})