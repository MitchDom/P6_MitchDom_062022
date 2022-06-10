// on importe Express
const express = require('express');
const bodyParser = require('body-parser');
// importation de mogoose
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');

// création d'une constante app qui sera notre application

const app = express();

mongoose.connect('mongodb+srv://MitchDom:DB202206@cluster0.ssdtd.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser : true,
  useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
    console.log(error);
    console.log('Connexion à MongoDB échouée !')
  });

app.use(express.json());

// Résolution du CORS, sécurité qui empêche des requêtes malveillantes, utilisation de headers pour signaler à l'API que la requête est recevable, et permettre ainsi à l'appli d'accéder à l'API sans problème
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/api/sauce', sauceRoutes);

// on exporte cette constante pour pouvoir y accéder depuis les autres fichiers du projet, notamment le serveur node
module.exports = app;