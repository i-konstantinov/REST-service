const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/users');
const { mapErrors } = require('../utils/mappers');


router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() != req.body.rePass.trim()) {
            throw new Error('Passwords don\'t match');
        }
        // нормализация: trim & toLowerCase
        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.get('/logout', isUser(), async (req, res) => {
    console.log('logout');
    res.end();
});


module.exports = router;