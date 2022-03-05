const pool = require('../config/database'); //connection to database

module.exports = {
    createUser: (data, callBack) => {
      console.log(data);
       pool.query(
         `INSERT INTO user (firstname,lastname,display_name,email,password,gender,age)
                VALUES(?,?,?,?,?,?,?)`,
           [
             data.firstname,
             data.lastname,
             data.display_name,
             data.email,
             data.password,
             data.gender,
             data.age
           ],
           (error,results) => {
             if (error) {
               callBack(error); //if error
             }
             return callBack(null, results); //if no error
           }
       );
     },
     //Login service
    getUserByUsername: (display_name, callBack) => {
      pool.query(
        `SELECT * FROM user WHERE display_name = ?`,
        [display_name],
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
         `select * from user`,
         [],
         (error,results) => {
           if(error){
            callBack(error);
           }
           return callBack(null,results);
           }
       );
     },
    getUserByUserId: (suid,callBack) => {
       pool.query(
         `select * from user where suid = ?`,
         [suid],
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
           `update user set firstname = ?, lastname = ?, display_name = ?, email = ?, password = ?, gender = ?, age = ? where SUID = ?`,
             [
               data.firstname,
               data.lastname,
               data.display_name,
               data.email,
               data.password,
               data.gender,
               data.age,
               data.suid
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
    deleteUser: (suid, callBack) => {
       pool.query(
         `delete from user where suid = ?`,
         [suid],
         (error,results) => {
           // error and results cannot be both valuable or null, if one is null the other is valuable and vice versa
           if (error) {
             return callBack(error); //if error
           }
           return callBack(null, results); //if no error
         }
       );
     }
   };