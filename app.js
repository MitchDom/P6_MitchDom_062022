// on importe Express
const express = require('express');
const bodyParser = require('body-parser');

// création d'une constante app qui sera notre application
const app = express();


// on exporte cette constante pour pouvoir y accéder depuis les autres fichiers du projet, notamment le serveur node
module.exports = app;