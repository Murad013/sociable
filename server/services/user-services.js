const pool = require('../config/database'); //connection to database

module.exports = {
    // Sign up service
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
             if (error) {
               callBack(error); //if error
             }
             return callBack(null, results); //if no error
           }
       );
    },
    // Adding bio and profile picture to profile service
    createProfile: (userInfo, data,callBack) => {
       pool.query(`INSERT INTO profile (suid, username, bio) VALUES(?,?,?);`,
       [userInfo.suid, userInfo.username, data.bio],
           (error,results) => {
             console.log(error);
             if (error) {
               callBack(error); //if error
             }
             return callBack(null, results); //if no error
           }
       );
    },
    // Edit profile information service
    updateProfileInfo: (userInfo, data, callBack) => {
      pool.query(
        //data parameter
        `update profile set bio = ? where suid = ?`,
          [
            data.bio,
            userInfo.suid,
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
    // Login service
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
    // Get all users service
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
    // Service for getting user by user ID
    getUserByUserID: (userInfo,callBack) => {
      pool.query(
        `select * from users where suid = ?`,
        [userInfo.suid],
        (error,results) => {
          if(error){
            return callBack(error);
          }
          return callBack(null,results);  //result is returned in an array format so we must receive the first index only because we only want one user at a time
          }
      );
    },
    // Service for search bar for usernames
    getUserByUsername: (userInfo,callBack) => {
       pool.query(
         `select * from users where username = ?`,
         [userInfo.username],
         (error,results) => {
           if(error){
             return callBack(error);
           }
           return callBack(null,results[0]);  //result is returned in an array format so we must receive the first index only because we only want one user at a time
           }
       );
    },
    // Service to gain access to user's bio and pfp to design a sleek looking profile page
    getProfileInfo: (userInfo,callBack) => {
      pool.query(
        `select * from profile where username = ?`,
        [userInfo.username],
        (error,results) => {
          if(error){
            return callBack(error);
          }
          return callBack(null,results); 
          }
      );
    },
    // Update user information service
    updateUser: (data,userInfo,callBack) => {
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
               userInfo.suid
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
    // Delete user account service
    deleteUser: (userInfo, callBack) => {
       pool.query(
         `delete from users where suid = ?`,
         [userInfo.suid],
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