const {createUser, createProfile, getUsers, getUserByUserId, updateUser, deleteUser, getUserByEmail} = require('../services/user-services');

//Importing methods used from bcrypt package for encrypting passwords
const {genSaltSync,hashSync,compareSync} = require('bcryptjs'); 
const {sign} = require('jsonwebtoken');


// a module is a collection of javascript functions and objects that can be used by external applications
module.exports = {
  createUser: (req, res) => {
    const token = req.cookie;
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createUser(body, (err, results) => {
      if (err) {
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  createProfile: (req,res) => {
    const body = req.body;
    createProfile(body, (err,results) => {

      if (err) {
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }

      if (!results) {
        return res.status(500).json({
          success: 0,
          data: "Email doesn't exist."
        });
      }
      const match = compareSync(body.password, results.password); //compares password inputted by user to hashed password stored in database and returns true or false
      if (match) {
        results.password = undefined;
        const token = sign({result: results}, process.env.KEY, {
          expiresIn: "24h"
        });
        
        res.cookie('authorization', token, {httpOnly: true, sameSite: 'strict'});
        return res.status(200).json({
          success: 1,
          message: "Successful Login!",
          token: token
        });
      } else {
        return res.status(500).json({
          success: 0,
          data: "Invalid email or password..."
        });
      }
    });
  },
  getUserByUserId: (req,res) => {
    const id = req.params.suid;
    getUserByUserId(id, (err, results) => {
      //If there is an error, console.log that error and return nothing
      if(err) {
        return;
      }
      //If no records were found
      if(!results) {
        return res.status(500).json({
          success: 0,
          message: 'No record was found with that ID'
        });
      }
      //If success, return user information
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if(!results){
        return res.status(500).json({
          success: 0,
          message: "No users found"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  updateUser: (req,res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt); //Encrypting the password
    updateUser(body, (err,results) => {
      if(err){
        console.log(err);
      }
      if(!results){
        return res.json({
          success: 0,
          message: 'This email is taken'
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
      const id = req.params.suid;
      deleteUser(id, (err, results) => {
        //If there is an error, console.log that error and return nothing
        if(err) {
          console.log(err);
          return;
        }
        //If no records were found
        if(results.affectedRows === 0) {
          return res.status(500).json({
            success: 0,
            message: 'No record was found with that ID'
          });
        }
        //If success
        if (results){
        return res.status(200).json({
          success: 1,
          message: "User deleted successfully"
        });
      }
      });
    }
};