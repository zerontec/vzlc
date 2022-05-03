const { Router } = require("express")

const router = Router();
const userRoutes = require('./user');





router.use('/user', userRoutes)



module.exports = router;