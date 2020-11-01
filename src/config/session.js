const jwt = require('jsonwebtoken');

module.exports = {
    User(req, res, next) {

        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, 'segredo');
            req.user = decode;
            next();
        } catch (e) {
            return res.status(401).json({ err: 'Não autorizado', reason: e });
        }
    },
    Administrator(req, res, next) {

        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, 'segredo');
            req.user = decode;
            if(decode.level == 'administrator'){
                next()
            }else{
                return res.status(401).json({ err: 'Não autorizado', reason: e });
            }
        } catch (e) {
            return res.status(401).json({ err: 'Não autorizado', reason: e });
        }
    },
}