const { model, Schema, Types: { ObjectId } } = require('mongoose');


const schema = new Schema({
    make: { type: String, minlength: [4, "Make must be at least 4 symbols long"] },
    model: { type: String, minlength: [4, "Model must be at least 4 symbols long"] },
    year: { type: Number, validate: {
        validator(value) {
            return value > 1949 && value < 2051;
        }, message: "The year must be between 1950 and 2050"
    } },
    description: { type: String, minlength: [11, "Description must be more than 10 symbols"] },
    price: { type: Number, min: [0, "Price must be a positive number"] },
    img: { type: String, required: true },
    material: { type: String, default: "" },
    _ownerId: { type: ObjectId, ref: "User" }
  });

  const Item = model('Item', schema);

  module.exports = Item;