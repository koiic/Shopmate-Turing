const fs = require('fs');

const file = fs.createReadStream('.env.sample');
const newFile = fs.createWriteStream('.env');

file.pipe(newFile);
