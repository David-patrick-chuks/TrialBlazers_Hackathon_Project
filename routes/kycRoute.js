const router = require('express').Router();
const upload = require('../middleware/multer');
const { authenticated, isAdmin } = require('../middleware/authenticate');
const {
  submitKYC,
  getMyKYC,
  getAllKYC,
  updateKYCStatus,
} = require('../controllers/kycController');

// User routes
router.post(
  '/submit', authenticated, upload.fields([
    { name: 'governmentIdCard', maxCount: 1 },
    { name: 'proofOfAddressImage', maxCount: 1 },
    { name: 'selfieWithIdCard', maxCount: 1 },
  ]),
  submitKYC
);

router.get('/my', authenticated, getMyKYC);

// Admin routes
router.get('/', authenticated, isAdmin, getAllKYC);
router.put('/:id/status', authenticated, isAdmin, updateKYCStatus);

module.exports = router;
