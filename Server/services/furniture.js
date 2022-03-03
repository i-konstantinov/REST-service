const Item = require('../models/Item');



async function create(item) {
    const result = new Item(item);
    await result.save();
    return result;
}

async function readAll() {
    return Item.find({});
}

async function readById(id) {
    return Item.findById(id);
}

async function readByUserId(userId) {
    return Item.find({}).where('_ownerId').equals(userId);
}

async function update(id, data) {
    const existing = await Item.findById(id);
    
    existing.make = data.make;
    existing.model = data.model;
    existing.year = data.year;
    existing.description = data.description;
    existing.price = data.price;
    existing.img = data.img;
    existing.material = data.material;

    await existing.save();
    return existing;
}

async function deleteById(id) {
    await Item.findByIdAndDelete(id);
} 


module.exports = {
    create,
    readAll,
    readById,
    readByUserId,
    update,
    deleteById
}