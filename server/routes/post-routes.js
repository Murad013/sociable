//This file just includes the routes for each of the endpoints

const {createPost,getPostsByUserID,getPosts,updatePost,deletePost} = require('../controllers/post-controllers');
const router = require('express').Router();
const {checkToken} = require('../auth/token-validation');

router.post('/post', checkToken, createPost); //Signup Public
router.get('/:suid', checkToken, getPostsByUserID); //Public
router.get('/', checkToken, getPosts); //Public
router.patch('/', checkToken, updatePost); //Protected
router.delete('/:pid', checkToken, deletePost); //Protected

module.exports = router;