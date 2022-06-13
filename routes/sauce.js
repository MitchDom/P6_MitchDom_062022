// création du routeur
const express = require('express');
const router = express.Router();
// importation du controller sauce
const sauceCtrl = require('../controllers/sauce');
// importation du middleware d'authentification
const auth = require('../middleware/auth');
// importation du middleware multer-config
const multer = require('../middleware/multer-config');

// route pour la création d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

// modification d'une sauce existante
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// retrouver une seule sauce par son identifiant
router.get('/:id', auth, sauceCtrl.getOneSauce);

// récupération de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// ajouter un like dislike sur une sauce
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

// on exporte le router de ce fichier
module.exports = router;