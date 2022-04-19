const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
     checkToken: (req,res,next) => {
          const authHeader = req.headers.authorization || req.headers.Authorization;
          if(!authHeader) return res.sendStatus(401);
          console.log(authHeader); // Bearer Token
          const token = authHeader.split(' ')[1];
          jwt.verify(token,process.env.KEY,(err, decoded) => 
          {
               if(err) return res.sendStatus(403); //Invalid Token
               req.user = decoded.username;
               next();
          }
          );
     }
}