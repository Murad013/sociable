const pool = require('../config/database'); //connection to database
const {login} = require('../controllers/user-controllers');
const jwtDecode = require('jwt-decode');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsic3VpZCI6NywiZmlyc3RuYW1lIjoiTXVyYWQiLCJsYXN0bmFtZSI6IlNhbGFtZWgiLCJkaXNwbGF5X25hbWUiOiJ6YWlkIiwiZW1haWwiOiJ6YWlkQGdtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJhZ2UiOjI1fSwiaWF0IjoxNjQ3OTA5NzQ1LCJleHAiOjE2NDc5MTMzNDV9.ygp8HK8tmbL0HKFGSkNmLbLCq8EoV9jq21GnUuQVnqg';
const decoded = jwtDecode(token);

module.exports = {
  //Find out how to add display_name and suid to the profile table after sign_up
    createPost: (data, callBack) => {
       pool.query(
         `insert into posts (suid,body) values (?,?)`,
           [decoded.result.suid, data.body],
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
         `select * from posts`,
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
           return callBack(null,results[0]);  //result is returned in an array format so we must receive the first index only because we only want one user at a time
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