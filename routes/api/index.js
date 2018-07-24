const router = require("express").Router();
const usersRoutes = require('./users');
const articleRoutes = require('./articles');
const authRoutes = require('./authRoutes');

router.use('/', authRoutes)
router.use('/user', usersRoutes)
router.use('/article', articleRoutes)

module.exports = router;