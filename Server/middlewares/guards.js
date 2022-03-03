function isUser() {
    return function (req, res, next) {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: "Please log in" });
        }
    };
}


function isGuest() {
    return function (req, res, next) {
        if (req.user) {
            res.status(400).json({ message: "Already logged in" });
        } else {
            next();
        }
    };
}


function isOwner() {
    return function (req, res, next) {
        if (req.user && req.user._id == res.locals.item._ownerId) {
            next();
        } else {
            res.status(403).json({
                message: 'You cannot modify this resource'
            });
        }
    };
}


module.exports = {
    isUser,
    isGuest,
    isOwner
}