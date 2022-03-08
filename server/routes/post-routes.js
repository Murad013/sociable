//This file just includes the routes for each of the endpoints

const {createPost,getPostsByUserId,getPosts,updatePost,deletePost} = require('../controllers/post-controllers');
const router = require('express').Router();
//const {canDeleteUser,canEditUser} = require('../permissions/user-permissions')
//const {checkToken} = require('../auth/token-validation');

router.post('/', createPost); //Signup Public
router.get('/:suid', getPostsByUserId); //Public
router.get('/', getPosts); //Public
router.patch('/', updatePost); //Protected
router.delete('/:pid', deletePost); //Protected

module.exports = router;