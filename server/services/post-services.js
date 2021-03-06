// Need to figure out how to organically insert the JWT in here and decode it without having to actually go and get it from postman and insert it in here. 
// This is definitely a start though

const pool = require('../config/database'); //connection to database

module.exports = {
  //Find out how to add display_name and suid to the profile table after sign_up
    createPost: (userInfo, data, callBack) => {
       pool.query(
         `insert into posts (suid, username, body) values (?,?,?)`,
           [userInfo.suid, userInfo.username, data.body],
           (error,results) => {
             if (error) {
               callBack(error); //if error
             }
             return callBack(null, results); //if no error
           }
       );
     },
     //Homepage
    getPosts: callBack => {
       pool.query(
         `select * from posts ORDER BY time_created DESC;`,
         [],
         (error,results) => {
           if(error){
            callBack(error);
           }
           return callBack(null,results);
           }
       );
     },
     //Profile Page
    getPostsByUserID: (userInfo,callBack) => {
       pool.query(
         `select * from posts where suid = ? ORDER BY time_created DESC;`,
         [userInfo.suid],
         (error,results) => {
           if(error){
             return callBack(error);
           }
           return callBack(null,results);  //result is returned in an array format so we must receive the first index only because we only want one user at a time
           }
       );
     },
     getPostsByID: (data,callBack) => {
      pool.query(
        `select * from posts where pid = ?;`,
        [data.pid],
        (error,results) => {
          if(error){
            return callBack(error);
          }
          return callBack(null,results);  //result is returned in an array format so we must receive the first index only because we only want one user at a time
          }
      );
    },
    updatePost: (data,callBack) => {
         pool.query(
           //data parameter
           `update posts set body = ? where pid = ?`,
             [
               data.body,
               data.id.pid
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
     // Going to be tough figuring out where to get the PID from dynamically
    deletePost: (data, callBack) => {
       pool.query(
         `delete from posts where pid = ?`,
         [data.pid],
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