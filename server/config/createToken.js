const jwt = require('jsonwebtoken');


module.exports = (data)=>{
    return jwt.sign(data, '!@#$%^&*', { expiresIn: '7d' });
}

