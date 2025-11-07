const argon2 = require('argon2');

const pass = process.argv[2] || 'minhasenha';
argon2.hash(pass)
  .then(h => {
    console.log(h);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
