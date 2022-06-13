// on appelle express afin de créer le routeur
const express = require('express');
const router = express.Router();
// on appelle le controller pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');
// création de deux routes POST puisque le frontend va aussi envoyer des informations (email et mp)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



// on exporte le routeur
module.exports = router;