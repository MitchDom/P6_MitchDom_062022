// on importe Express
const express = require('express');
const bodyParser = require('body-parser');
// importation de mogoose
const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');

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

app.post('/api/sauce', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ messsage : 'Sauce créée !'}))
        .catch(error => res.status(400).json({ error }));
    
});

app.put('/api/sauce/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/sauce/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauce/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/sauce', (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  });

module.exports = app;

// on exporte cette constante pour pouvoir y accéder depuis les autres fichiers du projet, notamment le serveur node
module.exports = app;