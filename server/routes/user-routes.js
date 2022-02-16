//This file just includes the routes for each of the endpoints

const {createUser,getUserByUserId,getUsers,updateUser,deleteUser,login} = require('../controllers/user-controllers');
const router = require('express').Router();
//const {canDeleteUser,canEditUser} = require('../permissions/user-permissions')
const {checkToken} = require('../auth/token-validation');

router.post('/signup', createUser); //Signup Public
router.get('/:id', getUserByUserId); //Public
router.get('/', getUsers); //Public
router.patch('/', checkToken, updateUser); //Protected
router.delete('/:id', checkToken, deleteUser); //Protected
router.post('/login',login); //Public

module.exports = router;