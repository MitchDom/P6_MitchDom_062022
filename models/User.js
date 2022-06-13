// on stocke des documents users (utilisateurs) dans la base de données : création du model User avec mongoose pour faciliter les tâches d'écriture, modif...

const mongoose = require('mongoose');

// ajout de unique validator comme plugin au schéma
const uniqueValidator = require('mongoose-unique-validator');
// on créé le schéma en utilisant la fonction schema de mongoose
const userSchema = mongoose.Schema({
   email: { type: String, required: true, unique: true }, // propriété unique : on ne pourra pas s'inscrire plusieurs fois avec la même adresse mail
   password: { type: String, requires: true } 
});

// on applique unique validator au schéma avant d'en faire un model
userSchema.plugin(uniqueValidator);
// on exporte ce schéma sous forme de model
module.exports = mongoose.model('User', userSchema);
