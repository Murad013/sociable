//This file just includes the routes for each of the endpoints

const {createUser,login,getUserByUserId,getUsers,updateUser,deleteUser} = require('../controllers/user-controllers');
const router = require('express').Router();
//const {canDeleteUser,canEditUser} = require('../permissions/user-permissions')
const {checkToken} = require('../auth/token-validation');

router.post('/signup', createUser); //Signup Public
router.get('/:suid', getUserByUserId); //Public
router.get('/', getUsers); //Public
router.patch('/', checkToken, updateUser); //Protected
router.delete('/:suid', deleteUser); //Protected
router.post('/login',login); //Public

module.exports = router;