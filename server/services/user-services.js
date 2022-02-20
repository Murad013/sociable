const pool = require('../config/database'); //connection to database

module.exports = {
    createUser: (data, callBack) => {
       pool.query(
         `insert into registration(firstName,lastName,username,password,gender)
                 values(?,?,?,?,?)`,
           [
             data.firstName,
             data.lastName,
             data.username,
             data.password,
             data.gender
           ],
           (error,results) => {
             if (error) {
               return callBack(error); //if error
             }
             return callBack(null, results); //if no error
           }
       );
     },
    getUserByUsername: (username, callBack) => {
      pool.query(
        `select * from registration where username = ?`,
        [username],
        (error,results) => {
          if(error){
            callBack(error);
          }
          return callBack(null,results[0]);
        }
      );
    },
    getUsers: callBack => {
       pool.query(
         `select id,firstName,lastName,username,password,gender from registration`,
         [],
         (error,results) => {
           if(error){
             return callBack(error);
           }
           return callBack(null,results);
           }
       );
     },
    getUserByUserId: (id,callBack) => {
       pool.query(
         `select * from registration where id = ?`,
         [id],
         (error,results) => {
           if(error){
             return callBack(error);
           }
           return callBack(null,results[0]);  //result is returned in an array format so we must receive the first index only because we only want one user at a time
           }
       );
     },
    updateUser: (data,callBack) => {
   
         pool.query(
           //data parameter
           `update registration set firstName =?, lastName =?, username =?, password =? where id=?`,
             [
               data.firstName,
               data.lastName,
               data.username,
               data.password,
               data.id
             ],
             (error,results) => {
               // error and results cannot be both valuable or null, if one is null the other is valuable and vice versa
               if (error) {
                 return callBack(error); //if error
               }
               return callBack(null, results); //if no error
             }
         );
     },
    deleteUser: (id, callBack) => {
       pool.query(
         `delete from registration where id = ?`,
         [id],
         (error,results) => {
           // error and results cannot be both valuable or null, if one is null the other is valuable and vice versa
           if (error) {
             return callBack(error); //if error
           }
           return callBack(null, results[0]); //if no error
         }
       );
     }
   };