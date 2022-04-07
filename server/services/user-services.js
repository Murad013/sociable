const pool = require('../config/database'); //connection to database
// const jwtDecode = require('jwt-decode');
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsic3VpZCI6NjUsImZpcnN0bmFtZSI6Ik11cmFkIiwibGFzdG5hbWUiOiJTYWxhbWVoIiwiZW1haWwiOiJtdXJhZHNhbGFtZWgwMTNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtdXJkYSIsImdlbmRlciI6Im1hbGUiLCJhZ2UiOjI1LCJwZnAiOm51bGx9LCJpYXQiOjE2NDkwMzg1OTgsImV4cCI6MTY0OTAzODU5OX0.eOP1dyVrmV_YdMbFRq2jk6uRDj1gQD7A4HDaPAaReTo';
// const decoded = jwtDecode(token);
// const {checkToken} = require('../auth/token-validation');


module.exports = {
  //Find out how to add display_name and suid to the profile table after sign_up
  
    createUser: (data, callBack) => {
      const query = `INSERT INTO users (firstname,lastname,username,email,password,gender,age)
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
             console.log(error);
             if (error) {
               callBack(error); //if error
             }
             return callBack(null, results); //if no error
           }
       );
     },

     //Can add on more to profile but as of now this will suffice
     createProfile: (data,callBack) => {
      console.log(data);
       pool.query(`INSERT INTO profile (bio) VALUES(?);`,
       [data.bio],
           (error,results) => {
             console.log(error);
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
        `SELECT * FROM users WHERE email = ?`,
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
         `select * from users`,
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
         `select * from users where suid = ?`,
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
           `update users set firstname = ?, lastname = ?, email = ?, password = ?, gender = ?, age = ? where suid = ?`,
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
         `delete from users where suid = ?`,
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