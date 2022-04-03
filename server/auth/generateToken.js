const jwt = require('jsonwebtoken');

const generateToken = (result) => {
//   const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
//   const jsontoken = sign({result}, process.env.KEY, {
//      expiresIn: "1000h"
//    });
//   return res.cookie('token', jsontoken, {
//     expires: new Date(Date.now() + expiration),
//     secure: false, // set to true if your using https
//     httpOnly: true,
//   });
};
module.exports = generateToken