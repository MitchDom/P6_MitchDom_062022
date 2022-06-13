// on importe Express
const express = require('express');
const bodyParser = require('body-parser');
// importation de mogoose
const mongoose = require('mongoose');
// importation de path qui donne accès au chemin du système de fichiers
const path = require('path');
// importation du routeur
const sauceRoutes = require('./routes/sauce');
// importation du routeur pour l'enregistrement de nouveaux utilisateurs
const userRoutes = require('./routes/user');

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

// Résolution du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // création du middleware qui intercepte toutes les requêts qui ont un content type json pour mettre à disposition le corps de cette requête sur l'objet requête dans req.body
app.use(express.json());

app.use(bodyParser.json());
// pour servir le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));
// on indique le routeur à utiliser après le début de la route commune
app.use('/api/sauces', sauceRoutes);
// afin d'enregistrer la route d'enregistrement d'un nouvel utilisateur
app.use('/api/auth', userRoutes);
// on exporte cette constante pour pouvoir y accéder depuis les autres fichiers du projet, notamment le serveur node
module.exports = app;