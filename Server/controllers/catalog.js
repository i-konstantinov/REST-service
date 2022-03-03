const router = require('express').Router();
const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const api = require('../services/furniture');
const { mapErrors } = require('../utils/mappers');


router.post('/', isUser(), async (req, res) => {
    const newItem = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,
        _ownerId: req.user._id
    }

    try {
        const result = await api.create(newItem);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});


router.get('/', async (req, res) => {
    const data = await api.readAll();
    res.json(data).end();
});

router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item;
    res.json(item).end();
});

router.get('/my/:userId', isUser(), async (req, res) => {
    const items = await api.readByUserId(req.params.userId);
    res.json(items).end();
});


router.put('/:id', preload(), isOwner(), async (req, res) => {
    const update = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material
    }
    try {
        const result = await api.update(req.params.id, update);
        res.json(result);
    } catch(err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});


router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        await api.deleteById(req.params.id);
        res.status(204);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

module.exports = router;