//This file just includes the routes for each of the user endpoints

const {createUser,createProfile,login, getUserByUserID, getProfileInfo, updateProfileInfo, getUsers,updateUser,deleteUser} = require('../controllers/user-controllers');
const router = require('express').Router();
//const {checkToken} = require('../auth/token-validation');

router.post('/signup', createUser); //Signup Public
router.post('/profile', createProfile);
router.get('/userID/:suid', getUserByUserID);
//router.get('/:username', getUserByUsername); Search Bar Route
router.get('/userProfile/:username', getProfileInfo);
router.get('/', getUsers); //Public
router.patch('/', updateUser); //Protected
router.patch('/profile', updateProfileInfo);
router.delete('/:suid', deleteUser); //Protected
router.post('/login',login); //Public

module.exports = router;