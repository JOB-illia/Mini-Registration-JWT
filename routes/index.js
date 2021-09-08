const Router = require('express')
const router = new Router()
const employees = require('./employeesRouter')

router.use('/employees', employees)

module.exports = router