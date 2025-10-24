const {
    verifyUserBVN,
    verifyUserNIN,
    getUserKYCStatus,
    getKYCByIdController,
    updateKYCStatusController,
    getAllKYCRecordsController,
    validateBVNFormat,
    validateNINFormat
} = require('../controllers/kycController');

const router = require('express').Router();

// KYC Verification Routes
router.post('/verify/bvn', verifyUserBVN);
router.post('/verify/nin', verifyUserNIN);

// KYC Status and Records Routes
router.get('/status', getUserKYCStatus);
router.get('/records/:kycId', getKYCByIdController);
router.get('/records', getAllKYCRecordsController);

// KYC Management Routes (Admin)
router.put('/records/:kycId/status', updateKYCStatusController);

// Validation Routes
router.post('/validate/bvn', validateBVNFormat);
router.post('/validate/nin', validateNINFormat);

module.exports = router;
