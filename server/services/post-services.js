// Need to figure out how to organically insert the JWT in here and decode it without having to actually go and get it from postman and insert it in here. 
// This is definitely a start though

const pool = require('../config/database'); //connection to database
// const jwtDecode = require('jwt-decode');
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsic3VpZCI6NjUsImZpcnN0bmFtZSI6Ik11cmFkIiwibGFzdG5hbWUiOiJTYWxhbWVoIiwiZW1haWwiOiJtdXJhZHNhbGFtZWgwMTNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJtdXJkYSIsImdlbmRlciI6Im1hbGUiLCJhZ2UiOjI1LCJwZnAiOm51bGx9LCJpYXQiOjE2NDkwMzg1OTgsImV4cCI6MTY0OTAzODU5OX0.eOP1dyVrmV_YdMbFRq2jk6uRDj1gQD7A4HDaPAaReTo';
// const decoded = jwtDecode(token);

module.exports = {
  //Find out how to add display_name and suid to the profile table after sign_up
    createPost: (data, callBack) => {
       pool.query(
         `insert into posts (body) values (?)`,
           [data.body],
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
    getPostsByUserID: (suid,callBack) => {
       pool.query(
         `select * from posts where suid = ?`,
         [suid],
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
           `update posts set body = ? where suid = ? and pid = ?`,
             [
               data.body,
               data.suid,
               data.pid
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
    deletePost: (pid, callBack) => {
       pool.query(
         `delete from posts where pid = ?`,
         [pid],
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