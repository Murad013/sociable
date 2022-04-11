//This file just includes the routes for each of the endpoints

const {createPost,getPostsByUserID,getPosts,updatePost,deletePost} = require('../controllers/post-controllers');
const router = require('express').Router();
const {checkToken} = require('../auth/token-validation');

router.post('/post', createPost); //Create Post
router.get('/:suid', getPostsByUserID); //Public
router.get('/', getPosts); //Public
router.patch('/:pid', updatePost); //Protected
router.delete('/:pid', deletePost); //Protected

module.exports = router;