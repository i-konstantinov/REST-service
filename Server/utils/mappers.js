function mapErrors(err) {
    if (Array.isArray(err)) {
        return err.join('\n');
    } else if (err.name == 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message).join('\n');
        return errors;
    } else if (typeof err.message == 'string') {
        return err.message;
    } else {
        return 'Request error';
    }
}

module.exports = {
    mapErrors
}