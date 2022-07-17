const mongoose = require('mongoose');
// Defining ItemSchema which consists single string field and represents the single to-do-item 
const itemSchema = new mongoose.Schema({
	id : String,
	name : String
});
// Creating a model that maps to the corresponding mongoDB document
const Item = mongoose.model('Item',itemSchema);

module.exports = {
	Item,
	itemSchema
};