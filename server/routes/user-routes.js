//This file just includes the routes for each of the endpoints

const {createUser,createProfile,login,getUserByUserId,getUsers,updateUser,deleteUser} = require('../controllers/user-controllers');
const router = require('express').Router();
const {checkToken} = require('../auth/token-validation');

router.post('/signup', createUser); //Signup Public
router.post('/profile', createProfile);
router.get('/:suid', getUserByUserId); //Public
router.get('/', getUsers); //Public
router.patch('/', checkToken, updateUser); //Protected
router.delete('/:suid',checkToken, deleteUser); //Protected
router.post('/login',login); //Public

module.exports = router;