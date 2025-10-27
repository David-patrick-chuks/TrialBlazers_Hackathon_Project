const express = require('express')
const router = express.Router();
const { createErrand, getAllErrands, getErrandById, updateErrand, deletedErrand } = require('../controllers/errandController')

router.post('/create',createErrand)

router.get('/getall',getAllErrands);

router.get('/get/:id', getErrandById);

router.put('/update/:id',updateErrand);

router.delete('/delete/:id',deletedErrand)

module.exports = router;