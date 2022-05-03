const {Router} = require('express');
const router = Router();
const {putUser, deleteUser,getUsers, getUserById, searchUser } = require('../controllers/userController');





router.get('/all', getUsers);
router.get('/:id', getUserById)
router.put('/update/:id', putUser);
router.delete('/delete/:id', deleteUser);
router.get('/search', searchUser)


module.exports = router;