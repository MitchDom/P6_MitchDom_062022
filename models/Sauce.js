// importation de mongoose pour créer le schéma de données
const mongoose = require('mongoose');
// création du schéma de données
const sauceSchema = mongoose.Schema({
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description : { type: String, required: true},
    heat: { type: Number, required: true},
    likes: { type: Number},
    dislikes: { type: Number},
    imageUrl: { type: String, required: true},
    mainPepper: { type: String, required: true},
    usersLiked: { type: [String]},
    usersDisliked: { type: [String]},
    userId: { type: String, required: true},
});
// exportation du model
module.exports = mongoose.model('Sauce', sauceSchema);