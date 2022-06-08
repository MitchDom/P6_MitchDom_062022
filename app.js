// on importe Express
const express = require('express');
const bodyParser = require('body-parser');

// création d'une constante app qui sera notre application

const app = express();


app.use(express.json());

// Résolution du CORS, sécurité qui empêche des requêtes malveillantes, utilisation de headers pour signaler à l'API que la requête est recevable, et permettre ainsi à l'appli d'accéder à l'API sans problème
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/sauce', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message : 'sauce créée !'
    });
});

app.get('/api/sauce', (req, res, next) => {
    const sauce = [
      {
        name: '',
        manufacturer: '',
        description : '',
        heat: '',
        likes: '',
        dislikes: '',
        imageUrl: '',
        mainPepper: '',
        usersLiked: '',
        usersDisliked: '',
        userId: '',
      },

    ];
    res.status(200).json(stuff);
  });

module.exports = app;

// on exporte cette constante pour pouvoir y accéder depuis les autres fichiers du projet, notamment le serveur node
module.exports = app;