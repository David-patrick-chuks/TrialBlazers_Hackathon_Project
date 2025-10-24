const {
    initializePayment,
    verifyPaymentStatus,
    getWalletBalance,
    withdrawFunds,
    getPaymentHistoryByUser,
    getBanksList,
    verifyBankAccountDetails,
    addBankDetails,
    getRunnerBankDetailsList,
    processWebhook,
    calculateCommissionAmount
} = require('../controllers/paymentController');

const router = require('express').Router();

// Payment Routes
router.post('/initialize', initializePayment);
router.get('/verify/:reference', verifyPaymentStatus);
router.get('/history', getPaymentHistoryByUser);
router.get('/commission/calculate', calculateCommissionAmount);

// Wallet Routes (for runners)
router.get('/wallet/balance', getWalletBalance);
router.post('/wallet/withdraw', withdrawFunds);

// Bank Routes
router.get('/banks', getBanksList);
router.post('/banks/verify', verifyBankAccountDetails);
router.post('/banks/details', addBankDetails);
router.get('/banks/details', getRunnerBankDetailsList);

// Webhook Routes (no auth required)
router.post('/webhook', processWebhook);

module.exports = router;
