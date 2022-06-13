// on appelle le package de criptage bcrypt pour les mp
const bcrypt = require("bcrypt");
// on importe le package jsonwebtoken afin de créer et vérifier les tokens
const jwt = require("jsonwebtoken");

//const { json } = require('express');

// on appelle le model user pour pouvoir lire et enregistrer des users dans les middlewares
const User = require("../models/User");

// création du middleware pour l'enregistrement de nouveaux utilisateurs
// on hache le mot de passe (fonction asynchrone, qui prend du temps, on commence par le hash)
// avec le hash proposé par bcrypt on enregistre le user dans la base de données
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// création de la fonction login pour connecter des utilisateurs existants : retrouver le user dans la base de données qui correspond à l'email qui est entrée par l'utilisateur de l'application, si user n'existe pas envoi d'une erreur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
