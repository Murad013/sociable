const pool = require('../config/database'); //connection to database

const jwtDecode = require('jwt-decode');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsic3VpZCI6NjYsImZpcnN0bmFtZSI6IlNlYW4iLCJsYXN0bmFtZSI6IkdvdWxkIiwiZW1haWwiOiJzZWFuZ291bGRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzZWFuIiwiZ2VuZGVyIjoibWFsZSIsImFnZSI6MjIsInBmcCI6bnVsbH0sImlhdCI6MTY0ODc5MTUyNSwiZXhwIjoxNjUyMzkxNTI1fQ.ePyLU8ARfwKc6CFHMGc4rITTo_eOwFELRbV75XNL7Wo';
const decoded = jwtDecode(token);

module.exports = {
  //Find out how to add display_name and suid to the profile table after sign_up
  
    createUser: (data, callBack) => {
      const query = `INSERT INTO user (firstname,lastname,username,email,password,gender,age)
                     VALUES(?,?,?,?,?,?,?);`
       pool.query(query,
           [
             data.firstname,
             data.lastname,
             data.username,
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
     createProfile: (data,callBack) => {
       pool.query(`INSERT INTO profile (suid,username,bio) VALUES(?,?,?);`,
       [decoded.result.suid, decoded.result.username,data.bio],
           (error,results) => {
             if (error) {
               callBack(error); //if error
             }
             return callBack(null, results); //if no error
           }
       );
     },
     //Login service
    getUserByEmail: (email, callBack) => {
      pool.query(
        `SELECT * FROM user WHERE email = ?`,
        [email],
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
           `update user set firstname = ?, lastname = ?, email = ?, password = ?, gender = ?, age = ? where suid = ?`,
             [
               data.firstname,
               data.lastname,
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