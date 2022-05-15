const {Router} = require('express');
const router = Router();
const {putUser, deleteUser,getUsers, getUserById, searchUser, createUser } = require('../controllers/userController');





router.get('/all', getUsers);
router.get('/:id', getUserById)
router.put('/update/:id', putUser);
router.delete('/delete/:id', deleteUser);
router.get('/search', searchUser)
router.post('/create', createUser)


module.exports = router;