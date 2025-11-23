const mongoose = require('mongoose');


const itemsSchema = new mongoose.Schema({
    foodName: { type: String, require: true },
    foodType: { type: String, require: true },
    mealType: { type: String, require: true },
    category: { type: String, require: true },
    price: { type: Number, require: true },
    imageFile: { type: String, require: true }
});


const Items = mongoose.model('product', itemsSchema);


module.exports = Items; 