
const furnitureService = require('../services/furniture');


function preload() {
    return async function (req, res, next) {
        try {
            const item = await furnitureService.readById(req.params.id);
            res.locals.item = item;
            next();
        } catch (err) {
            res.status(404).json({ message: "Record not found" });
        }
    };
}

module.exports = preload;