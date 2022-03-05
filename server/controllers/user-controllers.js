const {createUser, getUsers, getUserByUserId, updateUser, deleteUser, getUserByUsername} = require('../services/user-services');

//Importing methods used from bcrypt package for encrypting passwords
const {genSaltSync,hashSync,compareSync} = require('bcrypt'); 
const {sign} = require('jsonwebtoken');

// a module is a collection of javascript functions and objects that can be used by external applications
module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createUser(body, (err, results) => {
      if (err) {
        return;
      }
      console.log(results)
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
    getUserByUsername(body.display_name, (err, results) => {
      if (err) {
        console.log(err);
      }

      if (!results) {
        return res.status(500).json({
          success: 0,
          data: "Username doesn't exist."
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({result: results}, process.env.KEY, {
          expiresIn: "1h"
        });

        return res.status(200).json({
          success: 1,
          message: "Login Successfully!",
          token: jsontoken
        });
      } else {
        return res.status(500).json({
          success: 0,
          data: "Invalid username or password..."
        });
      }
    });
  },
  getUserByUserId: (req,res) => {
    const id = req.params.suid;
    getUserByUserId(id, (err, results) => {
      //If there is an error, console.log that error and return nothing
      if(err) {
        console.log(err);
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
  getUsers: (req,res) => {
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
          message: 'This username is taken'
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