//This file just includes the routes for each of the endpoints

const {createPost,getPostsByUserID,getPosts,updatePost,deletePost, getPostsByID} = require('../controllers/post-controllers');
const router = require('express').Router();
const {checkToken} = require('../auth/token-validation');

router.post('/post', createPost); //Create Post
router.get('/:suid', getPostsByUserID); //Public
router.get('/', getPosts); //Public
router.get('/:pid', getPostsByID);
router.patch('/:pid', updatePost);
router.delete('/:pid', deletePost);

module.exports = router;