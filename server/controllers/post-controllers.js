const {createPost, getPosts, getPostsByUserId, updatePost, deletePost} = require('../services/post-services');
module.exports = {
  createPost: (req, res) => {
    createPost(req.body, (err, results) => {
      if (err) {
        return;
      }
      console.log(results);
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
  getPostsByUserId: (req,res) => {
    const id = req.params.suid;
    getPostsByUserId(id, (err, results) => {
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
  getPosts: (req,res) => {
    getPosts((err, results) => {
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
  updatePost: (req,res) => {
    const body = req.body;
    updatePost(body, (err,results) => {
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
  deletePost: (req, res) => {
      const id = req.params.pid;
      deletePost(id, (err, results) => {
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