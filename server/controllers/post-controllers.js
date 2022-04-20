const {createPost, getPosts, getPostsByUserID, updatePost, deletePost, getPostsByID} = require('../services/post-services');
const jwtDecode = require('jwt-decode');
module.exports = {
  createPost: (req, res) => {
    const token = req.cookies.authorization;
    const decoded = jwtDecode(token);
    createPost(decoded.result, req.body, (err, results) => {
      if (err) {
        console.log(err)
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
  getPostsByUserID: (req,res) => {
    const token = req.cookies.authorization;
    const decoded = jwtDecode(token);
    getPostsByUserID(decoded.result, (err, results) => {
      //If there is an error, console.log that error and return nothing
      if(err) {
        console.log(err);
        return;
      }
      //If no records were found
      if(!results) {
        return res.status(500).json({
          success: 0,
          message: 'No posts were found from that user ID'
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
          message: "No posts found"
        });
      }
      
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getPostsByID: (req, res) => {
    const id = req.params;
    getPostsByID(id, (err, results) => {
      //If there is an error, console.log that error and return nothing
      if(err) {
        console.log(err);
        return;
      }
      //If no records were found
      if(!results) {
        return res.status(500).json({
          success: 0,
          message: 'No post was found with that ID'
        });
      }
      //If success, return user information
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  updatePost: (req,res) => {
    const id = req.params;
    const body = req.body.body;
    updatePost({id,body}, (err,results) => {
      if(err){
        console.log(err);
      }
      if(!results){
        return res.json({
          success: 0,
          message: 'Failed to update'
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfully"
      });
    });
  },
  deletePost: (req, res) => {
      const id = req.params;
      deletePost(id, (err, results) => {
        //If there is an error, console.log that error and return nothing
        if(err) {
          console.log(err);
          return;
        }
        //If no records were found
        if(!results) {
          return res.status(500).json({
            success: 0,
            message: 'No post was found with that ID'
          });
        }
        //If success
        if (results){
        return res.status(200).json({
          success: 1,
          message: "Post deleted successfully"
        });
      }
      });
  }
};